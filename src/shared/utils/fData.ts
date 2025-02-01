export const normalizeStringValue = (value: string | undefined) => {
  if (value === undefined) return;

  if (!isNaN(Number(value))) {
    return Number(value);
  }

  if (value === "true") return true;

  if (value === "false") return false;

  if (value === "null") return null;

  const date = new Date(value);
  if (!isNaN(date.getTime())) {
    return date;
  }

  return value;
};
