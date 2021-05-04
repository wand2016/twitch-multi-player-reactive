import getAxiosInstance from "@/axios";
import { findUsersByUserNames, User } from "@/users";
import { ResponseSubscriptions } from "@/subscriptions/type";

type RequestBody = {
  type: string;
  version: string;
  condition: {
    broadcaster_user_id: string;
  };
  transport: {
    method: "webhook";
    callback: string;
    secret: string;
  };
};

type Response = ResponseSubscriptions;

export async function subscribe(channels: string[]) {
  const users = await findUsersByUserNames(channels);

  const types = ["stream.online", "stream.offline"];
  const promises: Promise<unknown>[] = [];

  for (const channel of channels) {
    for (const type of types) {
      promises.push(trySubscribeSingle(users, channel, type));
    }
  }

  await Promise.all(promises);
}

async function doSubscribeSingleInternal(
  userId: string,
  type: string
): Promise<void> {
  const axios = getAxiosInstance();

  const params: RequestBody = {
    type,
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
    transport: {
      method: "webhook",
      callback: `https://${process.env.HOST}/api/subscriptions/callback`,
      secret: process.env.HMAC_SECRET ?? "",
    },
  };

  await axios.post<Response>("helix/eventsub/subscriptions", params);
}

async function trySubscribeSingle(
  users: User[],
  channel: string,
  type: string
): Promise<void> {
  const userId = users.find(({ name }) => name === channel)?.id ?? "";

  try {
    await doSubscribeSingleInternal(userId, type);
  } catch (e) {
    if (e?.response?.status === 409) {
      console.log("already registered:", { channel, userId, type });
      return;
    }

    throw e;
  }
}
