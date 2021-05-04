import getAxiosInstance from "@/axios";
import { findUserIdsByUserNames } from "@/users";

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
  const userIds = await findUserIdsByUserNames(channels);

  const axios = getAxiosInstance();

  const params: RequestBody = {
    type: "stream.online",
    version: "1",
    condition: {
      broadcaster_user_id: userIds[0],
    },
    transport: {
      method: "webhook",
      callback: `https://${process.env.HOST}/api/subscriptions/callback`,
      // TODO: randamize and env
      secret: "123456789a",
    },
  };

  try {
    const response = await axios.post<Response>(
      "helix/eventsub/subscriptions",
      params
    );
    console.log(response);

    return response;
  } catch (e) {
    console.log(e.response);
    throw e;
  }
}
