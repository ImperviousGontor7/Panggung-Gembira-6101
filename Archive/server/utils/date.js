export function toDate(value) {
  if (!value) return null;

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function isValidDate(value) {
  return toDate(value) !== null;
}

export function formatDate(
  value,
  locale = "id-ID",
  options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }
) {
  const date = toDate(value);
  if (!date) return "";

  return new Intl.DateTimeFormat(locale, options).format(date);
}

export function formatDateTime(
  value,
  locale = "id-ID",
  options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }
) {
  const date = toDate(value);
  if (!date) return "";

  return new Intl.DateTimeFormat(locale, options).format(date);
}

export function startOfDay(value = new Date()) {
  const date = toDate(value);
  if (!date) return null;

  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

export function endOfDay(value = new Date()) {
  const date = toDate(value);
  if (!date) return null;

  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}

export function diffInDays(start, end) {
  const startDate = toDate(start);
  const endDate = toDate(end);

  if (!startDate || !endDate) return null;

  const diffMs = endDate.getTime() - startDate.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

export default {
  toDate,
  isValidDate,
  formatDate,
  formatDateTime,
  startOfDay,
  endOfDay,
  diffInDays,
};