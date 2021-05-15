import { SignatureMismatch, verifySignature } from "@callback/signature";

const sampleHeader = {
  Host: "de13bc876b02.ngrok.io",
  "User-Agent": "Go-http-client/1.1",
  "Content-Length": "394",
  "Accept-Encoding": "gzip",
  "Content-Type": "application/json",
  "Twitch-Eventsub-Message-Id": "cb4a5bcc-b820-4c7f-a5f5-c6eb4c3cf3b8",
  "Twitch-Eventsub-Message-Retry": "0",
  "Twitch-Eventsub-Message-Signature":
    "sha256=894a51ef043f00316786ddff17a2c8b1d69b190ab297838895bd68d89be2955b",
  "Twitch-Eventsub-Message-Timestamp": "2021-05-15T08:18:54.603385505Z",
  "Twitch-Eventsub-Message-Type": "webhook_callback_verification",
  "Twitch-Eventsub-Subscription-Is-Batching-Enabled": "false",
  "Twitch-Eventsub-Subscription-Type": "stream.online",
  "Twitch-Eventsub-Subscription-Version": "1",
  "X-Forwarded-For": "54.184.54.118",
  "X-Forwarded-Proto": "https",
};

const sampleBody =
  '{"subscription":{"id":"9ae4c23e-a5ea-4143-9492-d27a4ce85066","status":"webhook_callback_verification_pending","type":"stream.online","version":"1","condition":{"broadcaster_user_id":"634932612"},"transport":{"method":"webhook","callback":"https://de13bc876b02.ngrok.io/callback"},"created_at":"2021-05-15T08:18:54.598197448Z","cost":1},"challenge":"piy_wknaGMbyRFyl4jCM1grNvqdbEUf6q-Fr6n484wY"}';

test("signature match", () => {
  expect(() => {
    verifySignature(sampleHeader, sampleBody, "123456789a");
  }).not.toThrow(SignatureMismatch);
});

test("signature mismatch", () => {
  expect(() => {
    const badHeader = {
      ...sampleHeader,
      "Twitch-Eventsub-Message-Timestamp": "2021-05-15T08:18:54.603385506Z",
    };
    verifySignature(badHeader, sampleBody, "123456789a");
  }).toThrow(SignatureMismatch);
});
