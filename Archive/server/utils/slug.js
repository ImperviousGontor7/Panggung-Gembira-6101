export function slugify(value, separator = "-") {
  if (value === null || value === undefined) {
    return "";
  }

  const safeSeparator =
    typeof separator === "string" && separator.length
      ? separator
      : "-";

  return String(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['"]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, safeSeparator)
    .replace(new RegExp(`${safeSeparator}{2,}`, "g"), safeSeparator)
    .replace(new RegExp(`^${safeSeparator}|${safeSeparator}$`, "g"), "")
    .toLowerCase();
}

export function createSlug(value, separator = "-") {
  return slugify(value, separator);
}

export default slugify;