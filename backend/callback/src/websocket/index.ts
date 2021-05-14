import Pusher from "pusher";

// TODO: pusherやめるかも
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
