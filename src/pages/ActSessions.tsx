import { useEffect, useState } from "react";
import { ActSession } from "../types/ActSession";
import { formatDuration } from "../utils/formatDuration";
import AddActSessionForm from "../components/AddActSessionForm";
import TrackActSessionForm from "../components/TrackActSessionForm";

function ActSessions() {

    //State för vad som finns i listan med aktivitetssessioner:
    const [actSessions, setActSessions] = useState<ActSession[]>([]);

    //useEffect som vid sidladdning hämtar aktivitetssessioner från databasen och lagrar dem i listan:
    useEffect(() => {
        // fetch("http://localhost:8080/api/actSessions")
        fetch(`${import.meta.env.VITE_API_URL}/api/actSessions`)
          .then(res => res.json())
          .then(data => setActSessions(data));
      });

    return (
        <div>
            <h2>Track a new activity session or enter one manually:</h2>
            {/* Skickar props (metoden för att lägga till aktivitet) till formuläret i AddActivityForm: */}
            <TrackActSessionForm />
            <AddActSessionForm /> 
            <h3>Saved activity Sessions:</h3>
            {/* Mappar sessionerna i listan till varsin div för att rendera aktivitetsnamnen: */}
            {actSessions.map((actSession: ActSession) => (
                    <div className="flex" key={actSession.sessionId}>{actSession.activity.activityName}
                    <p>{formatDuration(actSession.durationSeconds)}</p>
                    </div>
                ))}
        </div>
    );
}

export default ActSessions;