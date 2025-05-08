import { useEffect, useState } from "react";
import { Activity } from "../types/Activity";

function TrackActSessionForm() {
    //State för tillgängliga aktiviteter, vald aktivitet, start-tid och slut-tid: 
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivityId, setSelectedActivityId] = useState("");
    const [startTime, setStartTime] = useState<Date | null>(null);

    useEffect(() => {
        // fetch("http://localhost:8080/api/activities")
        fetch(`${import.meta.env.VITE_API_URL}/api/activities`)
          .then(res => res.json())
          .then(data => setActivities(data));
    }, []);
    //Startar session:
    const handleStartClick = () => {
        if (!selectedActivityId) return alert("Please select an activity first.");
        setStartTime(new Date());
    }
    //Avslutar session, beräknar tid i sekunder och sparar:
    const handleEndClick = () => {
        if (!startTime) return alert("You haven't started a session.");

        const endTime = new Date();
        const durationSeconds = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);

        const newSession = {
            activity: { id: selectedActivityId },
            actStart: startTime.toISOString(),
            actEnd:endTime.toISOString(),
            durationSeconds,
        }

        // fetch("http://localhost:8080/api/actSession", {
        fetch(`${import.meta.env.VITE_API_URL}/api/actSession`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newSession),
          }).then(() => {
            setStartTime(null);
            alert("Activity session saved!");
            setSelectedActivityId("");
          });

    }

    return (
        <div>
            <h3>Track session:</h3>
            <div className="flex">
                <div>
                    <select
                        value={selectedActivityId}
                        onChange={e => setSelectedActivityId(e.target.value)}
                        required>
                        <option value="" disabled>Select activity</option>
                        {activities.map(activity => (
                            <option key={activity.id} value={activity.id}>
                                {activity.activityName}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <button onClick={handleStartClick}>
                        Start Session
                    </button>
                    <button onClick={handleEndClick} disabled={startTime === null}>
                        End Session
                    </button>
                </div>
            </div>
        </div>
      );

}

export default TrackActSessionForm;