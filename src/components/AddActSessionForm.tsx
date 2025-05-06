import { useState, FormEvent, useEffect } from 'react'
import { Activity } from '../types/Activity';

function AddActSessionForm() {

    //State för vad som finns i listan med aktiviteter:
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivityId, setSelectedActivityId] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    //useEffect som vid sidladdning hämtar aktiviteter från databasen och lagrar dem i listan:
    useEffect(() => {
        fetch("http://localhost:8080/api/activities")
        .then(res => res.json())
        .then(data => setActivities(data));
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch("http://localhost:8080/api/actSession", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              activity: { id: selectedActivityId },
              actStart: startTime,
              actEnd: endTime,
              //duration: null // Beräknas i Backend
            })
          }).then(() => {
            setSelectedActivityId("");
            setStartTime("");
            setEndTime("");
          });
        };
        
        return (
          <div>
            <form onSubmit={handleSubmit}>
              <select value={selectedActivityId} onChange={e => setSelectedActivityId(e.target.value)}
              required>
                <option value="" disabled>Select activity</option>
                {activities.map(activity => (
                  <option key={activity.id} value={activity.id}>
                    {activity.activityName}
                  </option>
                ))}
              </select>
              <input
                type="datetime-local"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
              required/>
              <input
                type="datetime-local"
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                required/>
              <button>Save Session</button>
            </form>
          </div>
        );
}

export default AddActSessionForm;