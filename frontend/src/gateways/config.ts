import { components } from "@/types/schema-mine";
import getAxiosInstance from "@/gateways/axios";

export async function fetchConfig(): Promise<components["schemas"]["Config"]> {
  const response = await getAxiosInstance().get("config");
  return response.data;
}
