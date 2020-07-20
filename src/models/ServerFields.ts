export enum UserFields {
  seq = 'seq',
  nickname = 'nickname',
  id = 'username',
}

export enum CredentialFields {
  id = 'username',
  pw = 'password',
  deviceToken = 'deviceToken',
  accessToken = 'accessToken',
  refreshToken = 'refreshToken',
}

export enum TokenFieldsForHeader {
  access = 'access_token',
  refresh = 'refresh_token',
}
