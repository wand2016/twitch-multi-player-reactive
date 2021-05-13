import { getWSClient } from "@callback/websocket";

export type Notification = {
  type: "stream.online" | "stream.offline";
  channel: string;
};

export type Notify = {
  (notification: Notification): Promise<void>;
};

// TODO: 自前でWebSocketサーバ用意して遊ぶかも
export const notify: Notify = async (notification: Notification) => {
  await getWSClient().trigger("my-channel", "my-event", {
    notification,
  });
};
