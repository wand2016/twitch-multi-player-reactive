import { listSubscriptions } from "@bff/gateways/subscriptions";
import { subscribeIdempotent } from "@bff/gateways/subscriptions/subscribe";
import { unsubscribeById } from "@bff/gateways/subscriptions/unsubscribe";

export async function monitorStreamer(streamerId: string): Promise<void> {
  const types = ["stream.online", "stream.offline"] as const;

  await Promise.all(types.map((type) => subscribeIdempotent(streamerId, type)));
}

/**
 * for debug
 */
export async function unmonitorAll(): Promise<void> {
  const allSubscriptions = await listSubscriptions();

  await Promise.all(allSubscriptions.data.map(({ id }) => unsubscribeById(id)));
}
