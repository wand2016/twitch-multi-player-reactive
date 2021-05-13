import { components } from "@lib/types/schema-twitch";

export function isRequestVerification(
  request: components["schemas"]["CallbackRequestBody"]
): request is components["schemas"]["VerificationRequestBody"] {
  return request.hasOwnProperty("challenge");
}

export function isRequestNotification(
  request: components["schemas"]["CallbackRequestBody"]
): request is components["schemas"]["Notification"] {
  return request.hasOwnProperty("event");
}
