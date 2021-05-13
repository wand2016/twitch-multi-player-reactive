import getAxiosInstance from "@bff/gateways/axios";
import { findUsersByUserNames, User } from "@bff/gateways/users";
import { components } from "@lib/types/schema-twitch";

export async function subscribe(channels: string[]) {
  const users = await findUsersByUserNames(channels);

  const promises: Promise<unknown>[] = [];

  const types = ["stream.online", "stream.offline"] as const;

  for (const channel of channels) {
    for (const type of types) {
      promises.push(trySubscribeSingle(users, channel, type));
    }
  }

  await Promise.all(promises);
}

async function doSubscribeSingleInternal(
  userId: string,
  type: components["schemas"]["SubscriptionType"]
): Promise<void> {
  const axios = getAxiosInstance();

  const params: components["schemas"]["SubscriptionToPost"] = {
    type,
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
    transport: {
      method: "webhook",
      callback: `${process.env.CALLBACK_ENDPOINT}/api/subscriptions/callback`,
      secret: process.env.HMAC_SECRET ?? "",
    },
  };

  await axios.post<Response>("helix/eventsub/subscriptions", params);
}

async function trySubscribeSingle(
  users: User[],
  channel: string,
  type: components["schemas"]["SubscriptionType"]
): Promise<void> {
  const userId = users.find(({ name }) => name === channel)?.id ?? "";

  try {
    await doSubscribeSingleInternal(userId, type);
  } catch (e) {
    if (e?.response?.status === 409) {
      console.log("already registered:", { channel, userId, type });
      return;
    }

    console.warn(e);

    throw e;
  }
}
