/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly CALLBACK_ENDPOINT: string;
    readonly CLIENT_ID: string;
    readonly CLIENT_SECRET: string;
    readonly PUSHER_KEY: string;
    readonly PUSHER_SECRET: string;
    readonly PUSHER_APP_ID: string;
    readonly PUSHER_CLUSTER: string;
    readonly PUSHER_CHANNEL: string;
    readonly PUSHER_EVENT: string;
    readonly HMAC_SECRET: string;
    readonly STAGE: "dev" | "stage" | "production";
  }
}
