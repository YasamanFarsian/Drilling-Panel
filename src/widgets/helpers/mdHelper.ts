import { isValidNumber } from '@dt-advisory/helpers/isValidNumber';

export type GetMdToUseWithPercPropsType = {
  MD: number;
  TD: number;
  options?: {
    increase: number;
  };
};

const getMaxMD = ({ MD, TD }: Omit<GetMdToUseWithPercPropsType, 'options'>): number => {
  if (MD < TD) return MD;
  return TD;
};

export const getMdToUseWithPerc = ({ MD, TD, options }: GetMdToUseWithPercPropsType): number => {
  const mdToUse = getMaxMD({ MD, TD });
  if (options?.increase) {
    return mdToUse + mdToUse * options.increase;
  }
  return mdToUse;
};

type Data = { [key: string]: any };
type FilterMdType<T> = {
  data?: T[];
  max: number;
};
export const filterMd = <T extends Data>({ data, max }: FilterMdType<T>) => {
  return (data ?? []).filter((x) => {
    switch (true) {
      case isValidNumber(x.md):
        return x.md <= max;
      case isValidNumber(x.min?.md):
        return x.min.md <= max;
      case isValidNumber(x.Md):
        return x.Md <= max;
      default:
        return false;
    }
  });
};
