import { getWSClient } from "@callback/websocket";

export type Notification = {
  type: "stream.online" | "stream.offline";
  streamerName: string;
};

export type Notify = {
  (notification: Notification): Promise<void>;
};

// TODO: 自前でWebSocketサーバ用意して遊ぶかも
export const notify: Notify = async (notification: Notification) => {
  await getWSClient().trigger(
    process.env.PUSHER_CHANNEL ?? "",
    process.env.PUSHER_EVENT ?? "",
    {
      notification,
    }
  );
};
