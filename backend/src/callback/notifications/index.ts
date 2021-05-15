import Pusher from "pusher";

export type Notification = {
  type: "stream.online" | "stream.offline";
  streamerName: string;
};

export type Notify = {
  (notification: Notification): Promise<void>;
};

// TODO: pusherやめて自前でWebSocketサーバ用意して遊ぶかも
function createWSClient() {
  return new Pusher({
    appId: process.env.PUSHER_APP_ID ?? "",
    key: process.env.PUSHER_KEY ?? "",
    secret: process.env.PUSHER_SECRET ?? "",
    cluster: process.env.PUSHER_CLUSTER ?? "",
    useTLS: true,
  });
}

export const getWSClient = (() => {
  let pusher: Pusher;

  return () => {
    if (!pusher) {
      pusher = createWSClient();
    }

    return pusher;
  };
})();

export const notify: Notify = async (notification: Notification) => {
  await getWSClient().trigger(
    process.env.PUSHER_CHANNEL ?? "",
    process.env.PUSHER_EVENT ?? "",
    {
      notification,
    }
  );
};
