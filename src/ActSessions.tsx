import { useEffect, useState } from "react";
import { ActSession } from "./types/ActSession";
import { formatDuration } from "./utils/formatDuration";

function ActSessions() {

    //State för vad som finns i listan med produkter:
    const [ActSession, setActSessions] = useState<ActSession[]>([]);

    //useEffect som vid sidladdning hämtar aktivitetssessioner från db.json och lagrar dem i listan:
    useEffect(() => {
        fetch("http://localhost:8080/api/actSessions")
        .then(res => res.json())
        .then(data => setActSessions(data));
    })

    return (
        <div>
            <h3>Saved activity Sessions:</h3>
            {/* Mappar produkterna i listan till varsin div för att rendera produktnamnen: */}
            {ActSession.map((actSession: ActSession) => (
                    <div key={actSession.sessionId}>{actSession.activity.activityName}
                    <p>{formatDuration(actSession.duration)}</p>
                    </div>
                ))}
        </div>
    );
}

export default ActSessions;