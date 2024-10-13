// This file is auto-generated by @hey-api/openapi-ts

import type { Options } from "@hey-api/client-fetch";
import {
  queryOptions,
  type UseMutationOptions,
  infiniteQueryOptions,
  type InfiniteData,
} from "@tanstack/react-query";
import {
  client,
  userControllerGetCurrentUser,
  userControllerCreateUser,
  userControllerFindAllUsers,
  userControllerLoadMoreUsers,
  healthControllerCheck,
  authControllerSignIn,
  authControllerRegister,
  homeControllerHome,
} from "../services.gen";
import type {
  UserControllerCreateUserData,
  UserControllerCreateUserError,
  UserControllerCreateUserResponse,
  UserControllerFindAllUsersData,
  UserControllerFindAllUsersError,
  UserControllerFindAllUsersResponse,
  UserControllerLoadMoreUsersData,
  AuthControllerSignInData,
  AuthControllerSignInError,
  AuthControllerSignInResponse,
  AuthControllerRegisterData,
  AuthControllerRegisterError,
  AuthControllerRegisterResponse,
} from "../types.gen";

type QueryKey<TOptions extends Options> = [
  Pick<TOptions, "baseUrl" | "body" | "headers" | "path" | "query"> & {
    _id: string;
    _infinite?: boolean;
  },
];

const createQueryKey = <TOptions extends Options>(
  id: string,
  options?: TOptions,
  infinite?: boolean,
): QueryKey<TOptions>[0] => {
  const params: QueryKey<TOptions>[0] = {
    _id: id,
    baseUrl: (options?.client ?? client).getConfig().baseUrl,
  } as QueryKey<TOptions>[0];
  if (infinite) {
    params._infinite = infinite;
  }
  if (options?.body) {
    params.body = options.body;
  }
  if (options?.headers) {
    params.headers = options.headers;
  }
  if (options?.path) {
    params.path = options.path;
  }
  if (options?.query) {
    params.query = options.query;
  }
  return params;
};

export const userControllerGetCurrentUserQueryKey = (options?: Options) => [
  createQueryKey("userControllerGetCurrentUser", options),
];

export const userControllerGetCurrentUserOptions = (options?: Options) => {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      const { data } = await userControllerGetCurrentUser({
        ...options,
        ...queryKey[0],
        throwOnError: true,
      });
      return data;
    },
    queryKey: userControllerGetCurrentUserQueryKey(options),
  });
};

export const userControllerCreateUserQueryKey = (
  options: Options<UserControllerCreateUserData>,
) => [createQueryKey("userControllerCreateUser", options)];

export const userControllerCreateUserOptions = (
  options: Options<UserControllerCreateUserData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      const { data } = await userControllerCreateUser({
        ...options,
        ...queryKey[0],
        throwOnError: true,
      });
      return data;
    },
    queryKey: userControllerCreateUserQueryKey(options),
  });
};

export const userControllerCreateUserMutation = (
  options?: Partial<Options<UserControllerCreateUserData>>,
) => {
  const mutationOptions: UseMutationOptions<
    UserControllerCreateUserResponse,
    UserControllerCreateUserError,
    Options<UserControllerCreateUserData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await userControllerCreateUser({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const userControllerFindAllUsersQueryKey = (
  options?: Options<UserControllerFindAllUsersData>,
) => [createQueryKey("userControllerFindAllUsers", options)];

export const userControllerFindAllUsersOptions = (
  options?: Options<UserControllerFindAllUsersData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      const { data } = await userControllerFindAllUsers({
        ...options,
        ...queryKey[0],
        throwOnError: true,
      });
      return data;
    },
    queryKey: userControllerFindAllUsersQueryKey(options),
  });
};

const createInfiniteParams = <
  K extends Pick<QueryKey<Options>[0], "body" | "headers" | "path" | "query">,
>(
  queryKey: QueryKey<Options>,
  page: K,
) => {
  const params = queryKey[0];
  if (page.body) {
    params.body = {
      ...(queryKey[0].body as any),
      ...(page.body as any),
    };
  }
  if (page.headers) {
    params.headers = {
      ...queryKey[0].headers,
      ...page.headers,
    };
  }
  if (page.path) {
    params.path = {
      ...queryKey[0].path,
      ...page.path,
    };
  }
  if (page.query) {
    params.query = {
      ...queryKey[0].query,
      ...page.query,
    };
  }
  return params as unknown as typeof page;
};

export const userControllerFindAllUsersInfiniteQueryKey = (
  options?: Options<UserControllerFindAllUsersData>,
): QueryKey<Options<UserControllerFindAllUsersData>> => [
  createQueryKey("userControllerFindAllUsers", options, true),
];

export const userControllerFindAllUsersInfiniteOptions = (
  options?: Options<UserControllerFindAllUsersData>,
) => {
  return infiniteQueryOptions<
    UserControllerFindAllUsersResponse,
    UserControllerFindAllUsersError,
    InfiniteData<UserControllerFindAllUsersResponse>,
    QueryKey<Options<UserControllerFindAllUsersData>>,
    | number
    | Pick<
        QueryKey<Options<UserControllerFindAllUsersData>>[0],
        "body" | "headers" | "path" | "query"
      >
  >(
    // @ts-ignore
    {
      queryFn: async ({ pageParam, queryKey }) => {
        // @ts-ignore
        const page: Pick<
          QueryKey<Options<UserControllerFindAllUsersData>>[0],
          "body" | "headers" | "path" | "query"
        > =
          typeof pageParam === "object"
            ? pageParam
            : {
                query: {
                  page: pageParam,
                },
              };
        const params = createInfiniteParams(queryKey, page);
        const { data } = await userControllerFindAllUsers({
          ...options,
          ...params,
          throwOnError: true,
        });
        return data;
      },
      queryKey: userControllerFindAllUsersInfiniteQueryKey(options),
    },
  );
};

export const userControllerLoadMoreUsersQueryKey = (
  options?: Options<UserControllerLoadMoreUsersData>,
) => [createQueryKey("userControllerLoadMoreUsers", options)];

export const userControllerLoadMoreUsersOptions = (
  options?: Options<UserControllerLoadMoreUsersData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      const { data } = await userControllerLoadMoreUsers({
        ...options,
        ...queryKey[0],
        throwOnError: true,
      });
      return data;
    },
    queryKey: userControllerLoadMoreUsersQueryKey(options),
  });
};

export const healthControllerCheckQueryKey = (options?: Options) => [
  createQueryKey("healthControllerCheck", options),
];

export const healthControllerCheckOptions = (options?: Options) => {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      const { data } = await healthControllerCheck({
        ...options,
        ...queryKey[0],
        throwOnError: true,
      });
      return data;
    },
    queryKey: healthControllerCheckQueryKey(options),
  });
};

export const authControllerSignInQueryKey = (
  options: Options<AuthControllerSignInData>,
) => [createQueryKey("authControllerSignIn", options)];

export const authControllerSignInOptions = (
  options: Options<AuthControllerSignInData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      const { data } = await authControllerSignIn({
        ...options,
        ...queryKey[0],
        throwOnError: true,
      });
      return data;
    },
    queryKey: authControllerSignInQueryKey(options),
  });
};

export const authControllerSignInMutation = (
  options?: Partial<Options<AuthControllerSignInData>>,
) => {
  const mutationOptions: UseMutationOptions<
    AuthControllerSignInResponse,
    AuthControllerSignInError,
    Options<AuthControllerSignInData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await authControllerSignIn({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const authControllerRegisterQueryKey = (
  options: Options<AuthControllerRegisterData>,
) => [createQueryKey("authControllerRegister", options)];

export const authControllerRegisterOptions = (
  options: Options<AuthControllerRegisterData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      const { data } = await authControllerRegister({
        ...options,
        ...queryKey[0],
        throwOnError: true,
      });
      return data;
    },
    queryKey: authControllerRegisterQueryKey(options),
  });
};

export const authControllerRegisterMutation = (
  options?: Partial<Options<AuthControllerRegisterData>>,
) => {
  const mutationOptions: UseMutationOptions<
    AuthControllerRegisterResponse,
    AuthControllerRegisterError,
    Options<AuthControllerRegisterData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await authControllerRegister({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const homeControllerHomeQueryKey = (options?: Options) => [
  createQueryKey("homeControllerHome", options),
];

export const homeControllerHomeOptions = (options?: Options) => {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      const { data } = await homeControllerHome({
        ...options,
        ...queryKey[0],
        throwOnError: true,
      });
      return data;
    },
    queryKey: homeControllerHomeQueryKey(options),
  });
};
