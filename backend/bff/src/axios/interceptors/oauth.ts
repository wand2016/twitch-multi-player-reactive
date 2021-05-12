import type { AxiosInterceptorManager, AxiosRequestConfig } from "axios";
import axios from "axios";

type OnFulfilled<V = AxiosRequestConfig> = Parameters<
  AxiosInterceptorManager<V>["use"]
>[0];

type Interceptor = {
  onFulfilled: OnFulfilled;
};

type Credentials = {
  clientId: string;
  clientSecret: string;
};

/**
 * Bearerトークンを載せるinterceptorを作成
 */
export const createOAuthInterceptor = (
  credentials: Credentials
): Interceptor => {
  return {
    async onFulfilled(req) {
      if (req.headers["Authorization"]) {
        return req;
      }

      req.headers["Client-Id"] = credentials.clientId;
      req.headers["Authorization"] = `Bearer ${await fetchBearerToken(
        credentials
      )}`;

      return req;
    },
  };
};

/**
 * @see https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#oauth-client-credentials-flow
 */
async function fetchBearerToken(credentials: Credentials): Promise<string> {
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
        client_id: credentials.clientId,
        client_secret: credentials.clientSecret,
        grant_type: "client_credentials",
      },
    }
  );

  return response.data.access_token;
}
