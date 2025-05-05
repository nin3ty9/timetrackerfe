import { useEffect, useState } from "react";
import { Activity } from "./types/Activity";

function Activities() {

    //State för vad som finns i listan med produkter:
    const [Activities, setActivities] = useState<Activity[]>([]);

    //useEffect som vid sidladdning hämtar produkter från db.json och lagrar dem i listan:
    useEffect(() => {
        fetch("http://localhost:8080/api/activities")
        .then(res => res.json())
        .then(data => setActivities(data));
    })

    return (
        <div>
            <h3>Saved activities:</h3>
            {/* Mappar produkterna i listan till varsin div för att rendera produktnamnen: */}
            {Activities.map((activity: Activity) => (
                    <div key={activity.id}>{activity.activityName}</div>
                ))}
        </div>
    );
}

export default Activities;