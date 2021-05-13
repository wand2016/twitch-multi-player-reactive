import Pusher from "pusher";

// TODO: pusherやめるかも
// TODO: appIdとかハードコーディングなのテキトーすぎる
function createWSClient() {
  return new Pusher({
    appId: "1198610",
    key: process.env.PUSHER_KEY ?? "",
    secret: process.env.PUSHER_SECRET ?? "",
    cluster: "ap3",
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
