import getAxiosInstance from "@bff/axios";
import { ResponseSubscriptions } from "@bff/subscriptions/type";

type Response = ResponseSubscriptions;

export async function deleteSubscriptions(): Promise<void> {
  const axios = getAxiosInstance();

  const response = await axios.get<Response>("helix/eventsub/subscriptions");
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
