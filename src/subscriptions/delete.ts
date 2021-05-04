import getAxiosInstance from "@/axios";

const responseSample = {
  data: [
    {
      id: "26b1c993-bfcf-44d9-b876-379dacafe75a",
      status: "enabled",
      type: "streams.online",
      version: "1",
      cost: 1,
      condition: {
        broadcaster_user_id: "1234",
      },
      created_at: "2020-11-10T20:08:33Z",
      transport: {
        method: "webhook",
        callback: "https://this-is-a-callback.com",
      },
    },
  ],
  total: 2,
  total_cost: 2,
  max_total_cost: 10000,
  limit: 10000,
  pagination: {},
};

type Response = typeof responseSample;

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
