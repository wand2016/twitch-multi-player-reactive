import type { AxiosInterceptorManager, AxiosRequestConfig } from "axios";
import axios from "axios";

type OnFulfilled<V = AxiosRequestConfig> = Parameters<
  AxiosInterceptorManager<V>["use"]
>[0];

/**
 * Bearerトークンを載せる
 */
export const onFulfilled: OnFulfilled = async (req) => {
  if (req.headers["Authorization"]) {
    return req;
  }

  req.headers["Client-Id"] = process.env.CLIENT_ID;
  req.headers["Authorization"] = `Bearer ${await getClientCredentials()}`;

  return req;
};

/**
 * @see https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#oauth-client-credentials-flow
 */
async function getClientCredentials() {
  type ResponseCredentials = {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    scope: string[];
    token_type: "bearer";
  };

  const response = await axios.post<ResponseCredentials>(
    "https://id.twitch.tv/oauth2/token",
    {},
    {
      params: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "client_credentials",
        //scope:'a b c',
      },
    }
  );

  return response.data.access_token;
}
