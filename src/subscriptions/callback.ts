import { getWs } from "@/registry";

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

const requestNotificationOnlineSample = {
  subscription: {
    id: "f1c2a387-161a-49f9-a165-0f21d7a4e1c4",
    type: "stream.online",
    version: "1",
    status: "enabled",
    cost: 0,
    condition: {
      broadcaster_user_id: "1337",
    },
    transport: {
      method: "webhook",
      callback: "https://example.com/webhooks/callback",
    },
    created_at: "2019-11-16T10:11:12.123Z",
  },
  event: {
    id: "9001",
    broadcaster_user_id: "1337",
    broadcaster_user_login: "cool_user",
    broadcaster_user_name: "Cool_User",
    type: "live",
    started_at: "2020-10-11T10:11:12.123Z",
  },
};

const requestNotificationOfflineSample = {
  subscription: {
    id: "f1c2a387-161a-49f9-a165-0f21d7a4e1c4",
    type: "stream.offline",
    version: "1",
    status: "enabled",
    cost: 0,
    condition: {
      broadcaster_user_id: "1337",
    },
    created_at: "2019-11-16T10:11:12.123Z",
    transport: {
      method: "webhook",
      callback: "https://example.com/webhooks/callback",
    },
  },
  event: {
    broadcaster_user_id: "1337",
    broadcaster_user_login: "cool_user",
    broadcaster_user_name: "Cool_User",
  },
};

type RequestVerification = typeof requestVerificationSample;
type RequestNotificationOnline = typeof requestNotificationOnlineSample;
type RequestNotificationOffline = typeof requestNotificationOfflineSample;

type Request =
  | RequestVerification
  | RequestNotificationOnline
  | RequestNotificationOffline;

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
    const ws = getWs();
    ws.send(`notification has come!! ${req.event.broadcaster_user_name}`);
    return "";
  }

  return "";
}
