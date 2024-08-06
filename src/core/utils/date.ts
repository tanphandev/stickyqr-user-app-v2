// utils/dateUtils.ts
export const formatDateByLocale = (
  date: string | Date,
  locale: string,
  options?: Intl.DateTimeFormatOptions
): string => {
  // Ensure the date is a Date object
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  // Check if the date is valid
  if (isNaN(dateObj.getTime())) {
    throw new Error('Invalid date');
  }

  return new Intl.DateTimeFormat(locale, options).format(dateObj);
};
