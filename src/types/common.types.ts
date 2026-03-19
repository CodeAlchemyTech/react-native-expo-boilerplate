export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

/** Utility type to make specific keys required */
export type RequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/** Utility type to make specific keys optional */
export type PartialKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export interface SelectOption<T = string> {
  label: string;
  value: T;
}
