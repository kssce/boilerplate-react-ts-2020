const API_PREFIX = 'api';

export const TIMEOUT = 5000;

export enum NwMethod {
  GET = 'get',
  POST = 'post',
  DELETE = 'delete',
  PUT = 'put',
}

export const BASE_URI = API_PREFIX;

export const HTTP_CODE = Object.freeze({
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
});
