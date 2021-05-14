import getAxiosInstance from "@/gateways/axios";

export async function monitorStreamer(streamerId: string): Promise<void> {
  await getAxiosInstance().put(`streamers/${streamerId}/monitoring`);
}
