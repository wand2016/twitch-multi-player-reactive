import { notify } from "@callback/notifications";
import { components } from "@lib/types/schema-twitch";

export default async function handleNotification(
  callbackRequest: components["schemas"]["Notification"]
): Promise<void> {
  switch (callbackRequest.subscription.type) {
    case "stream.offline":
    case "stream.online":
      await notify({
        type: callbackRequest.subscription.type,
        streamerName: callbackRequest.event.broadcaster_user_name ?? "",
      });
      return;
    default:
      return;
  }
}
