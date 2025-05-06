import { useEffect, useState } from "react";
import { Activity } from "../types/Activity";
import AddActivityForm from "../components/AddActivityForm";

function Activities() {

    //State för vad som finns i listan med aktiviteter:
    const [activities, setActivities] = useState<Activity[]>([]);

    //useEffect som vid sidladdning hämtar aktiviteter från databasen och lagrar dem i listan:
    useEffect(() => {
        fetch("http://localhost:8080/api/activities")
        .then(res => res.json())
        .then(data => setActivities(data));
    });

    return (
        <div>
            <h2>New activity:</h2>
            {/* Skickar props (metoden för att lägga till aktivitet) till formuläret i AddActivityForm: */}
            <AddActivityForm /> 
            <h2>Saved activities:</h2>
            {/* Mappar aktiviteterna i listan till varsin div för att rendera aktivitetsnamnen: */}
            {activities.map((activity: Activity) => (
                    <div key={activity.id}>{activity.activityName}</div>
                ))}
        </div>
    );
}

export default Activities;