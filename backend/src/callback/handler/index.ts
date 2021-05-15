import { components } from "@lib/types/schema-twitch";
import {
  isRequestNotification,
  isRequestVerification,
} from "@callback/handler/guards";
import handleVerification from "@callback/handler/handle-verification";
import handleNotification from "@callback/handler/handle-notification";
import { verifySignature } from "@callback/signature";

export class RequestBodyParseFailed extends Error {
  constructor(rawBody: string) {
    super(`failed to parse body: ${rawBody}`);
  }
}

export class UnprocessableRequestBody extends Error {
  constructor(parsedBody: object) {
    super(`unprocessable request body: ${JSON.stringify(parsedBody, null, 2)}`);
  }
}

/**
 * @throws RequestBodyParseFailed
 */
function tryParseBody(
  rawBody: string
): components["schemas"]["CallbackRequestBody"] {
  try {
    return JSON.parse(rawBody) as components["schemas"]["CallbackRequestBody"];
  } catch {
    throw new RequestBodyParseFailed(rawBody);
  }
}

/**
 * @throws RequestBodyParseFailed
 * @throws UnprocessableRequestBody
 */
export async function handle(
  headers: Record<string, string | undefined>,
  rawBody: string
): Promise<string | void> {
  verifySignature(headers, rawBody, process.env.HMAC_SECRET ?? "");

  const parsedBody = tryParseBody(rawBody);

  if (isRequestVerification(parsedBody)) {
    return handleVerification(parsedBody);
  }
  if (isRequestNotification(parsedBody)) {
    await handleNotification(parsedBody);
    return;
  }

  throw new UnprocessableRequestBody(parsedBody);
}
