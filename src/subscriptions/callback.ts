const requestVerificationSample = {
  challenge: "pogchamp-kappa-360noscope-vohiyo",
  subscription: {
    id: "f1c2a387-161a-49f9-a165-0f21d7a4e1c4",
    status: "webhook_callback_verification_pending",
    type: "channel.follow",
    version: "1",
    cost: 1,
    condition: {
      broadcaster_user_id: "12826",
    },
    transport: {
      method: "webhook",
      callback: "https://example.com/webhooks/callback",
    },
    created_at: "2019-11-16T10:11:12.123Z",
  },
};

const requestNotificationSample = {
  subscription: {
    id: "f1c2a387-161a-49f9-a165-0f21d7a4e1c4",
    status: "enabled",
    type: "channel.follow",
    version: "1",
    cost: 1,
    condition: {
      broadcaster_user_id: "12826",
    },
    transport: {
      method: "webhook",
      callback: "https://example.com/webhooks/callback",
    },
    created_at: "2019-11-16T10:11:12.123Z",
  },
  event: {
    user_id: "1337",
    user_login: "awesome_user",
    user_name: "Awesome_User",
    broadcaster_user_id: "12826",
    broadcaster_user_login: "twitch",
    broadcaster_user_name: "Twitch",
  },
};

type RequestVerification = typeof requestVerificationSample;
type RequestNotification = typeof requestNotificationSample;

type Request = RequestVerification | RequestNotification;

function isRequestVerification(
  request: Request
): request is RequestVerification {
  return request.hasOwnProperty("challenge");
}

function isRequestNotification(
  request: Request
): request is RequestVerification {
  return request.hasOwnProperty("event");
}

// TODO: 署名検証する
export function callback(req: Request): string {
  if (isRequestVerification(req)) {
    return req.challenge;
  }
  if (isRequestNotification(req)) {
    return "";
  }

  return "";
}
