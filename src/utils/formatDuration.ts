import { Duration } from 'luxon';

export function formatDuration(isoDuration: string): string {
  const dur = Duration.fromISO(isoDuration).shiftTo('hours', 'minutes', 'seconds');
  return dur.toHuman();
}