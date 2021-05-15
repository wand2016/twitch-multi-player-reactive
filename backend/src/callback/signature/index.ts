import crypto from "crypto";

export abstract class SignatureVerificationFailedException extends Error {}

export class SignatureMismatch extends SignatureVerificationFailedException {}

/**
 * Twitchからのコールバックリクエストの真性性を検証する
 * @throws SignatureVerificationFailedException 署名検証に失敗したら送出
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
    throw new SignatureMismatch(
      `signature mismatch. expected: ${expected}, actual: ${actual}`
    );
  }
  return;
}
