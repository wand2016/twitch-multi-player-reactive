import getAxiosInstance from "@bff/axios";

import { components, paths } from "@lib/types/schema-twitch";

type Channel = {
  name: string;
  isLive: boolean;
};

export async function findChannelsByUserLoginNames(
  userLoginNames: string[]
): Promise<Channel[]> {
  const axios = getAxiosInstance();

  const params: paths["/streams"]["get"]["parameters"]["query"] = {
    user_login: userLoginNames,
  };

  const response = await axios.get<components["schemas"]["StreamPagination"]>(
    "helix/streams",
    {
      params,
    }
  );

  return userLoginNames.map((userLoginName) => {
    return {
      name: userLoginName,
      isLive: response.data.data.some((ch) => ch.user_login === userLoginName),
    };
  });
}
