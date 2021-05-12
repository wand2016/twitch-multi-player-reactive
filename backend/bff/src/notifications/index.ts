import { getWSClient } from "@bff/websocket";

export type Notification = {
  type: "stream.online" | "stream.offline";
  channel: string;
};

export async function notify(notification: Notification): Promise<void> {
  await getWSClient().trigger("my-channel", "my-event", {
    notification,
  });
}
