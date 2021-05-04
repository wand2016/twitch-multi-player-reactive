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
    {
      id: "35016908-41ff-33ce-7879-61b8dfc2ee16",
      status: "webhook_callback_verification_pending",
      type: "users.update",
      version: "1",
      cost: 1,
      condition: {
        user_id: "1234",
      },
      created_at: "2020-11-10T20:31:52Z",
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

/**
 * デバッグ用
 */
export async function listSubscriptions(): Promise<Response> {
  const axios = getAxiosInstance();

  return (await axios.get<Response>("helix/eventsub/subscriptions")).data;
}
