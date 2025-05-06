import { Duration } from 'luxon';

export function formatDuration(seconds: number): string {
  const dur = Duration.fromObject({ seconds }).shiftTo('hours', 'minutes', 'seconds');
  return dur.toHuman();
}
