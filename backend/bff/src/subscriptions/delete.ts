import getAxiosInstance from "@bff/axios";
import { components } from "@lib/types/schema-twitch";

export async function deleteSubscriptions(): Promise<void> {
  const axios = getAxiosInstance();

  const response = await axios.get<
    components["schemas"]["SubscriptionPagination"]
  >("helix/eventsub/subscriptions");
  const ids = response.data.data.map(({ id }) => id);

  // バルク指定できないっぽい
  Promise.all(
    ids.map(async (id) => {
      await axios.delete("helix/eventsub/subscriptions", {
        data: { id },
      });
    })
  );
}
