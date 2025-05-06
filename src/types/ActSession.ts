import { Activity } from './Activity';

export interface ActSession {
  sessionId: string;
  activity: Activity;
  actStart: string;   // ISO 8601 string (ex: "2024-05-05T12:00:00")
  actEnd: string;     // ISO string
  durationSeconds: number;
}