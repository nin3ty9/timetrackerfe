import { useEffect, useState } from "react";
import { ActSession } from "../types/ActSession";
import { formatDuration } from "../utils/formatDuration";
import AddActSessionForm from "../components/AddActSessionForm";

function ActSessions() {

    //State för vad som finns i listan med aktivitetssessioner:
    const [actSessions, setActSessions] = useState<ActSession[]>([]);

    //useEffect som vid sidladdning hämtar aktivitetssessioner från databasen och lagrar dem i listan:
    useEffect(() => {
        fetch("http://localhost:8080/api/actSessions")
          .then(res => res.json())
          .then(data => setActSessions(data));
      });

    return (
        <div>
            <h2>New activity session:</h2>
            {/* Skickar props (metoden för att lägga till aktivitet) till formuläret i AddActivityForm: */}
            <AddActSessionForm /> 
            <h3>Saved activity Sessions:</h3>
            {/* Mappar sessionerna i listan till varsin div för att rendera aktivitetsnamnen: */}
            {actSessions.map((actSession: ActSession) => (
                    <div key={actSession.sessionId}>{actSession.activity.activityName}
                    <p>{formatDuration(actSession.durationSeconds)}</p>
                    </div>
                ))}
        </div>
    );
}

export default ActSessions;