import { getWs } from "@/registry";

export type Notification = {
  type: "stream.online" | "stream.offline";
  channel: string;
};

export function notify(notification: Notification): void {
  getWs().send(JSON.stringify(notification));
}
