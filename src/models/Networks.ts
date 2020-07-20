export interface FetchedData<T> {
  data: { value: T };
}

export type NullableAuthToken = AuthToken | undefined | null;
export interface AuthToken {
  accessToken: string;
  refreshToken: string;
}

export enum NwMethod {
  GET = 'get',
  POST = 'post',
  DELETE = 'delete',
  PUT = 'put',
}

export enum HttpCode {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
}
