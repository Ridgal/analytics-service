export function formatDateToYMD(dateStr: string): string {
  return new Date(dateStr).toISOString().slice(0, 10);
};