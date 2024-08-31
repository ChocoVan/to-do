import './AddTask.css'
import React, { useState } from 'react'
import { database } from '../firebase'
import { addDoc, collection } from 'firebase/firestore'
import { useAuth } from './Auth'

function AddTask() {
    const { authUser } = useAuth();
    const [userEmail, setUserEmail] = useState("Guest");
    const [date, setDate] = useState("");
    const [toDo, setToDo] = useState("");
    const [completed, setCompleted] = useState(false);

    // if date chosen is before today's state, put up error message
    const handleSubmit = async (e) => {
        e.preventDefault();

        const today = new Date().toISOString().slice(0, 10);
        if (date < today) {
            window.alert("This date has already passed!");
            return;
        }

        await addDoc(collection(database, "tasks"), {
            userEmail: authUser && authUser.email !== "" ? authUser.email : "Guest",
            date,
            toDo,
            completed
        });

        setDate("");
        setToDo("");

        alert("Task added!")
        window.location.href = '/';
    }

    return (
        <div className='addTask-container'>
            <h1>Add Task</h1>
            <form className='add-form' onSubmit={handleSubmit}>
                <label>Task:</label>
                <input
                    type="text"
                    value={toDo}
                    onChange={(e) => setToDo(e.target.value)}
                    required
                ></input>

                <label>Date:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                ></input>

                <input className='submit-btn' type="submit" value="Add"></input>
            </form>
        </div>
    )
}

export default AddTask