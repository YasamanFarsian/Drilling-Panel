import { v4 as uuidv4 } from 'uuid';

export type MapKeyType<T extends string> = {
  key: string;
  value: T;
};

export const mapWithKeyId = <T extends string>(data: T[]): MapKeyType<T>[] => {
  return data.map((x) => ({ key: uuidv4(), value: x }));
};
