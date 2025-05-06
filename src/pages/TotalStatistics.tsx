import { useEffect, useState } from "react";
import { formatDuration } from "../utils/formatDuration";

function TotalStatistics() {

    const [activityTotals, setActivityTotals] = useState<Map<string, number>>(new Map());

    useEffect(() => {
    fetch("http://localhost:8080/api/actSessions/totalStats")
        .then(res => res.json())
        .then(data => {
            const entries = Object.entries(data) as [string, number][];
            setActivityTotals(new Map(entries));
        });
    });

    return (
        <div>
            <h2>Total activity sessions:</h2>
            {/* Mappar sessionerna i listan till varsin div för att rendera aktivitetsnamnen: */}
            {Array.from(activityTotals.entries()).map(([activityName, totalDuration]) => (
                <li key={activityName}>
                    {activityName}: {formatDuration(totalDuration)} seconds
                </li>
            ))}
        </div>
    );
}

export default TotalStatistics;