export const isValidNumber = (input: unknown): input is number => {
  return typeof input === 'number' && !isNaN(input);
};
