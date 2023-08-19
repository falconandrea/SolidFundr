/**
 * Format a timestamp into a human-readable date string.
 *
 * @param timestamp - The timestamp to format.
 * @returns The formatted date string.
 */
export const formatTimestamp = (timestamp: bigint): string => {
  const value = Number(timestamp) * 1000;
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(value).toLocaleDateString("en-US", options);
};
