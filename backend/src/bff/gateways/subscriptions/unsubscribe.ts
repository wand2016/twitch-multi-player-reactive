import getAxiosInstance from "@bff/gateways/axios";
import { paths } from "@lib/types/schema-twitch";

export async function unsubscribeById(subscriptionId: string): Promise<void> {
  const axios = getAxiosInstance();

  const data: paths["/eventsub/subscriptions"]["delete"]["parameters"]["query"] = {
    id: subscriptionId,
  };

  await axios.delete("eventsub/subscriptions", { data });
}
