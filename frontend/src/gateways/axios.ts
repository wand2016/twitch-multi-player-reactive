import axios from "axios";

function createAxiosInstance() {
  return axios.create({
    // TODO: 本実装
    baseURL: "http://localhost:3000/dev/api/",
  });
}

// TODO: メモ化ユーティリティ作りたい
let memo: ReturnType<typeof createAxiosInstance>;
export default function getAxiosInstance() {
  if (!memo) {
    memo = createAxiosInstance();
  }
  return memo;
}
