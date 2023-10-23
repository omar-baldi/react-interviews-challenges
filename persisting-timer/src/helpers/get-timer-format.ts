export function getTimerFormat(minutes: number, seconds = 0): string {
  const minutesLabel = minutes.toString().padStart(2, '0');
  const secondsLabel = seconds.toString().padStart(2, '0');

  return `${minutesLabel}:${secondsLabel}`;
}
