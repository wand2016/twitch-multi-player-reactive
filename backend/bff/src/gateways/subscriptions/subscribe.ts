import getAxiosInstance from "@bff/gateways/axios";
import { components } from "@lib/types/schema-twitch";

export async function subscribe(
  broadcasterUserId: string,
  type: components["schemas"]["SubscriptionType"]
): Promise<void> {
  const axios = getAxiosInstance();

  const params: components["schemas"]["SubscriptionToPost"] = {
    type,
    version: "1",
    condition: {
      broadcaster_user_id: broadcasterUserId,
    },
    transport: {
      method: "webhook",
      callback: `${process.env.CALLBACK_ENDPOINT}/api/subscriptions/callback`,
      secret: process.env.HMAC_SECRET ?? "",
    },
  };

  await axios.post<Response>("helix/eventsub/subscriptions", params);
}

export async function subscribeIdempotent(
  broadcasterUserId: string,
  type: components["schemas"]["SubscriptionType"]
): Promise<"newly subscribed" | "already subscribed"> {
  try {
    await subscribe(broadcasterUserId, type);
    return "newly subscribed";
  } catch (e) {
    if (e?.response?.status === 409) {
      console.log("already registered");
      return "already subscribed";
    }
    throw e;
  }
}
