/**
 * Adds the specified number of days to a date
 * @param date The base date
 * @param days Number of days to add
 * @returns A new Date object with the days added
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(date.getDate() + days);
  return result;
}
