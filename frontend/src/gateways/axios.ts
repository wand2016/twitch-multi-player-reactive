import axios from "axios";

function createAxiosInstance() {
  // HACK: 同期XHR
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/config.json", false);
  xhr.setRequestHeader("content-type", "application/json");
  xhr.send();

  const config = JSON.parse(xhr.responseText);

  return axios.create({
    baseURL: config.API_ENDPOINT,
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
