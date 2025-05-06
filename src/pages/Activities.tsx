import { FormEvent, useEffect, useState } from "react";
import { Activity } from "../types/Activity";
import AddActivityForm from "../components/AddActivityForm";

function Activities() {

    //State för vad som finns i listan med aktiviteter:
    const [activities, setActivities] = useState<Activity[]>([]);
    const [editingActivityId, setEditingActivityId] = useState<string | null>(null);
    const [editedName, setEditedName] = useState<string>("");

    //useEffect som vid sidladdning hämtar aktiviteter från databasen och lagrar dem i listan:
    useEffect(() => {
        fetch("http://localhost:8080/api/activities")
        .then(res => res.json())
        .then(data => setActivities(data));
    });

    const startEditing = (id: string, currentName: string) => {
        setEditingActivityId(id);
        setEditedName(currentName);
      };
    
      const cancelEditing = () => {
        setEditingActivityId(null);
        setEditedName("");
      };
    
      const handleEditSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!editingActivityId) return;
    
        await fetch(`http://localhost:8080/api/activity/${editingActivityId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ activityName: editedName }),
    })

    setActivities((prev) =>
        prev.map((a) =>
          a.id === editingActivityId ? { ...a, activityName: editedName } : a
        ));

        cancelEditing();
    }

    return (
        <div>
            <h2>New Activity:</h2>
            <AddActivityForm />
            <h2>Saved activities:</h2>
            {activities.map((activity) =>
                editingActivityId === activity.id ? (
                <form key={activity.id} onSubmit={handleEditSubmit}>
                    <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}/>
                    <button type="submit">Save</button>
                    <button type="button" onClick={cancelEditing}>Cancel</button>
                </form>
            ) : (
                <div className="flex" key={activity.id}>
                    {activity.activityName}
                    <button className="btns" onClick={() => startEditing(activity.id, activity.activityName)}>Edit</button>
                </div>
                )
            )}
        </div>
    )
}

export default Activities;