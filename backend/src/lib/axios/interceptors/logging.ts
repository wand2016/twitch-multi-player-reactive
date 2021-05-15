import type {
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

type OnFulfilledRequest<V = AxiosRequestConfig> = Parameters<
  AxiosInterceptorManager<V>["use"]
>[0];
type OnFulfilledResponse<V = AxiosResponse> = Parameters<
  AxiosInterceptorManager<V>["use"]
>[0];
type OnRejected<V = AxiosResponse> = Parameters<
  AxiosInterceptorManager<V>["use"]
>[1];

type Interceptor = {
  onFulfilledRequest: OnFulfilledRequest;
  onFulfilledResponse: OnFulfilledResponse;
  onRejected: OnRejected;
};

export const loggingInterceptor: Interceptor = {
  onFulfilledRequest(req) {
    console.info(req);

    return req;
  },
  onFulfilledResponse(res) {
    console.info(res.status, res.headers, res.data);

    return res;
  },
  onRejected(error) {
    console.error(error);
  },
};
