import getAxiosInstance from "@bff/axios";

type QueryParameter = {
  user_login: string[];
};

type Response = {
  data: [
    {
      id: string;
      user_id: string;
      user_login: string;
      user_name: string;
      game_id: string;
      game_name: string;
      type: string;
      title: string;
      viewer_count: number;
      started_at: string;
      language: string;
      thumbnail_url: string;
      tag_ids: string[];
      is_mature: boolean;
    }
  ];
  pagination: {
    cursor: string;
  };
};

type Channel = {
  name: string;
  isLive: boolean;
};

export async function findChannelsByUserLoginNames(
  userLoginNames: string[]
): Promise<Channel[]> {
  const axios = getAxiosInstance();

  const params: QueryParameter = {
    user_login: userLoginNames,
  };

  const response = await axios.get<Response>("helix/streams", {
    params,
  });

  return userLoginNames.map((userLoginName) => {
    return {
      name: userLoginName,
      isLive: response.data.data.some((ch) => ch.user_login === userLoginName),
    };
  });
}
