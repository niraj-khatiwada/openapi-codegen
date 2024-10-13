import Router from 'next/router';
import { ApiContext } from './apiContext';

import axios, { AxiosError, AxiosRequestConfig, HttpStatusCode } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const axiosAgent = axios.create({
  baseURL,
});

axiosAgent.interceptors.request.use(
  (request) => {
    // TODO: Change this to cookie
    if (localStorage.getItem('ACCESS_TOKEN_KEY'))
      request.headers.Authorization = `Bearer ${localStorage.getItem('ACCESS_TOKEN_KEY')}`;
    return request;
  },
  (error) => Promise.reject(error),
);

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error: unknown) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failedQueue = [];
};

let RETRY_COUNT = 0;

axiosAgent.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    const shouldRetry = false;
    if (
      error.response.status === HttpStatusCode.Unauthorized &&
      shouldRetry &&
      originalRequest?.method?.toLowerCase?.() === 'get'
    ) {
      if (RETRY_COUNT <= 2) {
        RETRY_COUNT++;
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => {
              return axiosAgent(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        return new Promise((resolve, reject) => {
          axiosAgent
            .post('/api/auth/refresh')
            .then(({ status }) => {
              if (status === HttpStatusCode.Ok) {
                processQueue(null);
                resolve(axiosAgent(originalRequest));
              } else {
                throw new Error("Tokens didn't arrive from the server");
              }
            })
            .catch((err: AxiosError) => {
              forceLogout();
              processQueue(err);
              reject(err);
            })
            .finally(() => {
              isRefreshing = false;
            });
        });
      } else {
        RETRY_COUNT = 0;
        forceLogout();
      }
    }

    return Promise.reject(error);
  },
);

function forceLogout() {
  const pathname = Router.pathname;
  if (!pathname.includes('login') && !pathname.includes('register')) {
    Router.replace(
      {
        pathname: 'logout',
        query: {
          redirect: Router.asPath,
        },
      },
      'logout',
    );
    RETRY_COUNT = 0;
  }
}

export type ErrorWrapper<TError> = TError;

export type ApiFetcherOptions<TBody, THeaders, TQueryParams, TPathParams> = {
  url: string;
  method: string;
  body?: TBody;
  headers?: THeaders;
  queryParams?: TQueryParams;
  pathParams?: TPathParams;
  signal?: AbortSignal;
} & ApiContext['fetcherOptions'];

export async function apiFetch<
  TData,
  TError,
  TBody extends {} | FormData | undefined | null,
  THeaders extends {},
  TQueryParams extends {},
  TPathParams extends {},
>({
  url,
  method,
  body,
  headers,
  queryParams,
  pathParams,
  signal,
  ...axiosConfig
}: ApiFetcherOptions<
  TBody,
  THeaders,
  TQueryParams,
  TPathParams
>): Promise<TData> {
  try {
    const requestUrl = `${baseURL}${resolveUrl(url, pathParams)}`;

    // Construct the Axios request configuration
    const config: AxiosRequestConfig = {
      url: requestUrl,
      method: method as any,
      data: body,
      headers,
      params: queryParams,
      signal: signal,
      ...axiosConfig,
    };

    const response = await axiosAgent.request<TData>(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios error
      const axiosError = error as AxiosError<TError>;
      throw { status: axiosError.code, payload: axiosError?.response?.data };
    } else {
      // Handle unexpected error
      throw {
        status: 'unknown',
      } as TError;
    }
  }
}

const resolveUrl = (url: string, pathParams: Record<string, string> = {}) => {
  return url.replace(/\{\w*\}/g, (key) => pathParams[key.slice(1, -1)]);
};
