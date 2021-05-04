import getAxiosInstance from "@/axios";
import { findUsersByUserNames, User } from "@/users";

const requestSample = {
  type: "channel.follow",
  version: "1",
  condition: {
    broadcaster_user_id: "12826",
  },
  transport: {
    method: "webhook",
    callback: `https://${process.env.HOST}/api/subscriptions/callback`,
    secret: "s3cRe7",
  },
};
type RequestBody = typeof requestSample;

const responseSample = {
  data: [
    {
      id: "f1c2a387-161a-49f9-a165-0f21d7a4e1c4",
      status: "webhook_callback_verification_pending",
      type: "channel.follow",
      version: "1",
      cost: 1,
      condition: {
        broadcaster_user_id: "12826",
      },
      transport: {
        method: "webhook",
        callback: "https://example.com/webhooks/callback",
      },
      created_at: "2019-11-16T10:11:12.123Z",
    },
  ],
  total: 1,
  total_cost: 1,
  max_total_cost: 10000,
  limit: 10000,
};

type Response = typeof responseSample;

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
      // TODO: randamize and env
      secret: "123456789a",
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
