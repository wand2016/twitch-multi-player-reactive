import { components } from "@lib/types/schema-twitch";
import {
  isRequestNotification,
  isRequestVerification,
} from "@callback/handler/guards";
import handleVerification from "@callback/handler/handle-verification";
import handleNotification from "@callback/handler/handle-notification";
import { verifySignature } from "@callback/signature";

export async function handle(
  callbackRequest: components["schemas"]["CallbackRequestBody"]
): Promise<string | void> {
  // TODO: 署名検証する
  verifySignature({}, "");

  if (isRequestVerification(callbackRequest)) {
    return handleVerification(callbackRequest);
  }
  if (isRequestNotification(callbackRequest)) {
    await handleNotification(callbackRequest);
    return;
  }

  console.error(callbackRequest);
  throw new Error("unhandled callback request");
}
