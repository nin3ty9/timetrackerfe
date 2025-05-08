import { useState, ChangeEvent, FormEvent } from 'react'

function AddActivityForm() {

    const [inputNewActivity, setInputNewActivity] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("Ändring i formulär");
        setInputNewActivity(e.target.value);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputNewActivity) return alert("Please name the activity first.");
        console.log("Spara formulär");
        // fetch("http://localhost:8080/api/activity", {
        fetch(`${import.meta.env.VITE_API_URL}/api/activity`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({activityName: inputNewActivity})
        })
        .then(() => setInputNewActivity(""));//Tömmer textfältet
    }
        
    return (
        <form className="flex" onSubmit={handleSubmit}>
            <input type="text" value={inputNewActivity} onChange={handleChange} />
            <button>Save</button>
        </form>
    );
}

export default AddActivityForm;