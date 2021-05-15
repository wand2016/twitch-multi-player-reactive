import crypto from "crypto";

export class SignatureMismatch extends Error {
  constructor(expected: string, actual: string) {
    super(`signature mismatch. expected: ${expected}, actual: ${actual}`);
  }
}

/**
 * Twitchからのコールバックリクエストの真性性を検証する
 * @throws SignatureMismatch 署名検証に失敗したら送出
 */
export function verifySignature(
  requestHeader: Record<string, string | undefined>,
  requestBody: string,
  secret: string
): void {
  const hmacMessage =
    (requestHeader["Twitch-Eventsub-Message-Id"] ?? "") +
    (requestHeader["Twitch-Eventsub-Message-Timestamp"] ?? "") +
    requestBody;

  const signature = crypto.createHmac("sha256", secret).update(hmacMessage);

  const expected = `sha256=${signature.digest("hex")}`;
  const actual = requestHeader["Twitch-Eventsub-Message-Signature"] ?? "";

  if (expected !== actual) {
    throw new SignatureMismatch(expected, actual);
  }
  return;
}
