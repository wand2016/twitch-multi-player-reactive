import axios from "axios";
import { onFulfilled as addCredentials } from "@/axios/interceptors/oauth";

function createAxiosInstance() {
  const ret = axios.create({
    // TODO: envに逃がしたほうがいい気がする
    baseURL: "https://api.twitch.tv/",
  });

  ret.interceptors.request.use(addCredentials);

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
