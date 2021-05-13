import getAxiosInstance from "@bff/gateways/axios";

import { components, paths } from "@lib/types/schema-twitch";

export async function searchUsersByLoginNames(
  loginNames: string[]
): Promise<components["schemas"]["UserList"]> {
  const axios = getAxiosInstance();

  const params: paths["/users"]["get"]["parameters"]["query"] = {
    login: loginNames,
  };

  const response = await axios.get<components["schemas"]["UserList"]>(
    "helix/users",
    {
      params,
    }
  );

  return response.data;
}
