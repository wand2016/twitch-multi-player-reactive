import getAxiosInstance from "@/axios";

type QueryParameter = {
  id?: string[];
  login?: string[];
};

type ResponseUser = {
  broadcaster_type: "partner" | "affiliate" | "";
  description: string;
  display_name: string;
  id: string;
  login: string;
  offline_image_url: string;
  profile_image_url: string;
  type: "staff" | "admin" | "global_mod" | "";
  /** integer */
  view_count: number;
  email: string;
  /** date */
  created_at: string;
};
type Response = {
  data: ResponseUser[];
};

export type User = {
  id: string;
  name: string;
};

export async function findUsersByUserNames(
  userNames: string[]
): Promise<User[]> {
  const axios = getAxiosInstance();

  const params: QueryParameter = {
    login: userNames,
  };

  const response = await axios.get<Response>("helix/users", {
    params,
  });

  return response.data.data.map(({ login, id }) => ({
    name: login,
    id,
  }));
}
