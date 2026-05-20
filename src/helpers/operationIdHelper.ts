export const validateOperationId = (id?: string): string | null => {
  if (!id) return null;
  const _id = id.trim();
  const numRe = /^\d+$/; // only digits are allowed
  if (numRe.test(_id)) {
    return _id;
  }
  return null;
};
