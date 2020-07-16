export interface FetchedData<T> {
  data: { value: T };
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
}
