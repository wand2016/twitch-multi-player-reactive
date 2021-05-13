import getAxiosInstance from "@bff/gateways/axios";

import { components, paths } from "@lib/types/schema-twitch";

export type User = {
  id: string;
  name: string;
};

export async function findUsersByUserNames(
  userNames: string[]
): Promise<User[]> {
  const axios = getAxiosInstance();

  const params: paths["/users"]["get"]["parameters"]["query"] = {
    login: userNames,
  };

  const response = await axios.get<components["schemas"]["UserList"]>(
    "helix/users",
    {
      params,
    }
  );

  return response.data.data.map(({ login, id }) => ({
    name: login,
    id,
  }));
}
