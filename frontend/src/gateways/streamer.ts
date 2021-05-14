import { components, paths } from "@/types/schema-mine";
import getAxiosInstance from "@/gateways/axios";

export async function fetchStreamers(
  streamerNames: string[]
): Promise<components["schemas"]["StreamerList"]> {
  const params: paths["/streamers"]["get"]["parameters"]["query"] = {
    name: streamerNames,
  };

  const response = await getAxiosInstance().get<
    components["schemas"]["StreamerList"]
  >("streamers", { params });

  return response.data;
}
