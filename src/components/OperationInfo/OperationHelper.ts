const isInt = (n: number) => n % 1 === 0;

const roundNumTo = (data: number, fix = 3) => {
  return parseFloat(Number(data).toFixed(fix));
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const getFormattedValue = (data?: number, fix?: number) => {
  if (typeof data !== 'number' || Number.isNaN(data)) {
    return '-';
  }
  return isInt(data) ? data : roundNumTo(data, fix);
};

export const getValue = (str?: string | number) => str ?? '-';
