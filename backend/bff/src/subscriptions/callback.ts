import { notify } from "@bff/notifications";
import { ResponseSubscription } from "@bff/subscriptions/type";

type CallbackRequestVerification = {
  challenge: string;
  subscription: ResponseSubscription;
};

type CallbackRequestNotificationOnline = {
  subscription: ResponseSubscription & { type: "stream.online" };
  event: {
    id: string;
    broadcaster_user_id: string;
    broadcaster_user_login: string;
    broadcaster_user_name: string;
    type: string;
    started_at: string;
  };
};

type CallbackRequestNotificationOffline = {
  subscription: ResponseSubscription & { type: "stream.offline" };
  event: {
    broadcaster_user_id: string;
    broadcaster_user_login: string;
    broadcaster_user_name: string;
  };
};

type CallbackRequest =
  | CallbackRequestVerification
  | CallbackRequestNotificationOnline
  | CallbackRequestNotificationOffline;

function isRequestVerification(
  request: CallbackRequest
): request is CallbackRequestVerification {
  return request.hasOwnProperty("challenge");
}

function isRequestNotification(
  request: CallbackRequest
): request is
  | CallbackRequestNotificationOffline
  | CallbackRequestNotificationOnline {
  return request.hasOwnProperty("event");
}

// TODO: 署名検証する
export async function callback(req: CallbackRequest): Promise<string> {
  if (isRequestVerification(req)) {
    return req.challenge;
  }
  if (isRequestNotification(req)) {
    await notify({
      type: req.subscription.type,
      channel: req.event.broadcaster_user_name,
    });
    return "";
  }

  console.error(req);
  throw new Error("unhandled callback request");
}
