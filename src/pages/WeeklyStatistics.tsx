import { useEffect, useState } from "react";
import { WeeklyStats } from "../types/WeeklyStats";
import { formatDuration } from "../utils/formatDuration";

function WeeklyStatistics() {
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStats>({});
  const [selectedWeek, setSelectedWeek] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:8080/api/actSessions/totalStatsByWeek")
      .then((res) => res.json())
      .then((data: WeeklyStats) => setWeeklyStats(data))
      .catch((err) => console.error("Failed to fetch weekly stats:", err));
  }, []);

  return (
    <div>
      <h2>Weekly Activity sessions</h2>

        <div>
            <label>Statistics for week </label>
            <select value={selectedWeek} onChange={e => setSelectedWeek(e.target.value)}
            required>
            <option value="" disabled>Select week</option>
                {Object.keys(weeklyStats)
                    .sort()
                    .map((week) => (
                <option key={week} value={week}>
                    {week}
                </option>
                ))}
            </select>
        </div>
        <div key={selectedWeek}>
          <h3>{selectedWeek}</h3>
          <ul>
            {Object.entries(weeklyStats[selectedWeek] || {}).map(([activityName, seconds]) => (
              <li className="flex" key={activityName}>
                {activityName}: {formatDuration(seconds)}
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
}

export default WeeklyStatistics;
