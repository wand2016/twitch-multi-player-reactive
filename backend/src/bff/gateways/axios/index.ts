import axios from "axios";
import { createOAuthInterceptor } from "@lib/axios/interceptors/oauth";
import { loggingInterceptor } from "@lib/axios/interceptors/logging";

function createAxiosInstance() {
  const ret = axios.create({
    // TODO: envに逃がしたほうがいい気がする
    baseURL: "https://api.twitch.tv/helix/",
  });

  const { onFulfilled: addOAuthToken } = createOAuthInterceptor({
    clientId: process.env.CLIENT_ID ?? "",
    clientSecret: process.env.CLIENT_SECRET ?? "",
  });
  ret.interceptors.request.use(addOAuthToken);

  // debug
  if (process.env.STAGE === "dev") {
    const {
      onFulfilledRequest,
      onFulfilledResponse,
      onRejected,
    } = loggingInterceptor;
    ret.interceptors.request.use(onFulfilledRequest);
    ret.interceptors.response.use(onFulfilledResponse, onRejected);
  }

  return ret;
}

// TODO: メモ化ユーティリティ作りたい
let memo: ReturnType<typeof createAxiosInstance>;
export default function getAxiosInstance() {
  if (!memo) {
    memo = createAxiosInstance();
  }
  return memo;
}
