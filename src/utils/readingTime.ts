import readingTime from "reading-time";

export function getReadingTime(text: string): string {
  const stats = readingTime(text);
  return `${Math.ceil(stats.minutes)} min read`;
}
