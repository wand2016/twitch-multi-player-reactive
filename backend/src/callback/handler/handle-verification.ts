import { components } from "@lib/types/schema-twitch";

/**
 * このコールバックがSubscription登録者のものであることを証明する
 */
export default function handleVerification(
  callbackRequest: components["schemas"]["VerificationRequestBody"]
): string {
  return callbackRequest.challenge;
}
