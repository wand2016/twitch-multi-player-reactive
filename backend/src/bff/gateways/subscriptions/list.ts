import getAxiosInstance from "@bff/gateways/axios";
import { components } from "@lib/types/schema-twitch";

export async function listSubscriptions(): Promise<
  components["schemas"]["SubscriptionListWithCost"]
> {
  const axios = getAxiosInstance();

  const response = await axios.get<
    components["schemas"]["SubscriptionListWithCost"]
  >("eventsub/subscriptions");

  return response.data;
}
