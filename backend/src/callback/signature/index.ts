import crypto from "crypto";

type Headers = Record<string, string | undefined>;

export class SignatureMismatch extends Error {
  constructor(expected: string, actual: string) {
    super(`signature mismatch. expected: ${expected}, actual: ${actual}`);
  }
}

function getHeader(headers: Headers, key: string): string {
  return headers[key] ?? headers[key.toLowerCase()] ?? "";
}

/**
 * Twitchからのコールバックリクエストの真性性を検証する
 * @throws SignatureMismatch 署名検証に失敗したら送出
 */
export function verifySignature(
  requestHeaders: Record<string, string | undefined>,
  requestBody: string,
  secret: string
): void {
  const hmacMessage =
    getHeader(requestHeaders, "Twitch-Eventsub-Message-Id") +
    getHeader(requestHeaders, "Twitch-Eventsub-Message-Timestamp") +
    requestBody;

  const signature = crypto.createHmac("sha256", secret).update(hmacMessage);

  const expected = `sha256=${signature.digest("hex")}`;
  const actual = getHeader(requestHeaders, "Twitch-Eventsub-Message-Signature");

  if (expected !== actual) {
    throw new SignatureMismatch(expected, actual);
  }
  return;
}
