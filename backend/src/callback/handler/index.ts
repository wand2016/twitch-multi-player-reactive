import { components } from "@lib/types/schema-twitch";
import {
  isRequestNotification,
  isRequestVerification,
} from "@callback/handler/guards";
import handleVerification from "@callback/handler/handle-verification";
import handleNotification from "@callback/handler/handle-notification";
import { verifySignature } from "@callback/signature";

export async function handle(
  headers: Record<string, string | undefined>,
  body: string
): Promise<string | void> {
  // TODO: 署名検証する
  verifySignature(headers, body, process.env.HMAC_SECRET ?? "");

  const parsedBody = JSON.parse(
    body
  ) as components["schemas"]["CallbackRequestBody"];

  if (isRequestVerification(parsedBody)) {
    return handleVerification(parsedBody);
  }
  if (isRequestNotification(parsedBody)) {
    await handleNotification(parsedBody);
    return;
  }

  console.error(headers, body, parsedBody);
  throw new Error("unhandled callback request");
}
