export type NullableString = string | null | undefined;

export type Fn = (...args: any[]) => any;

export interface Promisable {
  resolve: () => any;
}

export type NullableBoolean = boolean | null;
