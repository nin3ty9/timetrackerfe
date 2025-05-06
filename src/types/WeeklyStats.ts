
export type WeeklyStats = {
    [week: string]: {
        [activityName: string]: number;
    }
}