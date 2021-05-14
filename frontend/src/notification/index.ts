import { components } from "@/types/schema-mine";
import Pusher from "pusher-js";

export function useNotification(
  pusherConfig: components["schemas"]["Config"]["pusher"],
  streamerNames: string[],
  onNotified: () => Promise<void> | void
): Pusher {
  const notificationTypes = ["stream.online", "stream.offline"] as const;
  type Notification = {
    type: typeof notificationTypes[number];
    streamerName: string;
  };
  type Data = {
    notification: Notification;
  };

  Pusher.logToConsole = true;

  const pusher = new Pusher(pusherConfig.key, {
    cluster: pusherConfig.cluster,
  });

  const channel = pusher.subscribe(pusherConfig.channel);
  channel.bind(pusherConfig.event, async ({ notification }: Data) => {
    const streamerName = notification.streamerName.toLowerCase();

    if (!notificationTypes.includes(notification.type)) {
      return;
    }
    if (!streamerNames.includes(streamerName)) {
      return;
    }

    await onNotified();
  });

  return pusher;
}
