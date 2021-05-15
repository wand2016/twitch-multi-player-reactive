interface SignatureVerificationFailedException {
  reason: string;
}

class SignatureVerificationFailedExceptionBase
  extends Error
  implements SignatureVerificationFailedException {
  constructor(public readonly reason: string) {
    super();
  }
}

/**
 * Twitchからのコールバックリクエストの真性性を検証する
 * TODO: 本実装
 * @throws SignatureVerificationFailedException 署名検証に失敗したら送出
 */
export function verifySignature(
  requestHeader: Record<string, string | undefined>,
  requestBody: string
): void {
  return;
}
