import axios from "axios";
import { createOAuthInterceptor } from "@lib/axios/interceptors/oauth";

function createAxiosInstance() {
  const ret = axios.create({
    // TODO: envに逃がしたほうがいい気がする
    baseURL: "https://api.twitch.tv/",
  });

  const { onFulfilled } = createOAuthInterceptor({
    clientId: process.env.CLIENT_ID ?? "",
    clientSecret: process.env.CLIENT_SECRET ?? "",
  });

  ret.interceptors.request.use(onFulfilled);

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
