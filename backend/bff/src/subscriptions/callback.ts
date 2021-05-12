import { notify } from "@bff/notifications";
import { components } from "@lib/types/schema-twitch";

function isRequestVerification(
  request: components["schemas"]["CallbackRequestBody"]
): request is components["schemas"]["VerificationRequestBody"] {
  return request.hasOwnProperty("challenge");
}

function isRequestNotification(
  request: components["schemas"]["CallbackRequestBody"]
): request is components["schemas"]["Notification"] {
  return request.hasOwnProperty("event");
}

// TODO: 署名検証する
export async function callback(
  req: components["schemas"]["CallbackRequestBody"]
): Promise<string> {
  if (isRequestVerification(req)) {
    return req.challenge;
  }
  if (isRequestNotification(req)) {
    switch (req.subscription.type) {
      case "stream.offline":
      case "stream.online":
        await notify({
          type: req.subscription.type,
          channel: req.event.broadcaster_user_name ?? "",
        });

        return "";
      default:
        return "";
    }
  }

  console.error(req);
  throw new Error("unhandled callback request");
}
