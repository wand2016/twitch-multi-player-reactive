import getAxiosInstance from "@bff/gateways/axios";

import { components, paths } from "@lib/types/schema-twitch";

export async function searchStreamsByUserId(
  userIds: string[]
): Promise<components["schemas"]["StreamPagination"]> {
  const axios = getAxiosInstance();

  const params: paths["/streams"]["get"]["parameters"]["query"] = {
    user_id: userIds,
  };

  const response = await axios.get<components["schemas"]["StreamPagination"]>(
    "helix/streams",
    {
      params,
    }
  );

  return response.data;
}
