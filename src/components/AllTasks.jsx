import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, orderBy, doc, updateDoc, getDoc, deleteDoc } from 'firebase/firestore'
import { database } from '../firebase'
import './AllTasks.css'
import { useAuth } from './Auth'
import TaskCard from './TaskCard'

// don't see how local storage can be utilized in this application
// possible uses:
// - fetching required data from local storage so don't need to fetch from 
//   firestore every time (this improves performance?)

function AllTasks() {
    const { authUser } = useAuth();
    const [tasks, setTasks] = useState([]);
    const sortBy = {
        field: "date",
        order: "asc"
    };

    useEffect(() => {
        const getTasks = async () => {
            try {
                const today = new Date().toISOString().slice(0, 10);
                let taskQuery = query(collection(database, "tasks"), orderBy(sortBy.field, sortBy.order))
    
                const querySnapshot = await getDocs(taskQuery);
                const taskData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                    
                // get only the tasks associated with the user
                const filteredTasks = taskData.filter(task =>
                    task.userEmail === (authUser ? authUser.email:'Guest')
                );
                // delete tasks from dates that have already passed
                filteredTasks.forEach(task => {
                    if (task.date < today){
                        handleDeleteTask(task.id);
                    }
                });

                setTasks(filteredTasks);
            }
            catch (error) {
                console.error("Error fetching tasks: ", error)
            }
        };

        getTasks();

    }, [authUser]);

    const handleCompleteChange = async (taskId) => {
            const docRef = doc(database, "tasks", taskId);
            const docSnap = await getDoc(docRef);
            // retrieve current completed status of task
            const currentCompleted = docSnap.data().completed;

            // only update completed field
            await updateDoc(docRef, { completed: !currentCompleted });

            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === taskId ? {...task, completed: !currentCompleted} : task
                )
            );

            console.log("Task updated!");
            window.alert("Completion status updated!");
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteDoc(doc(database, "tasks", taskId));
            setTasks(tasks.filter(task => task.id !== taskId));
        }
        catch (error) {
            console.error("Error deleting post: ", error);
        }
    }

    return (
        <div className='all-tasks'>
            <h1 className='header'>All Tasks</h1>
            <div className='tasks-container'>
                {tasks.map(task => (
                    <div className="tasks" key={task.id}>
                        <TaskCard task={task}/>
                        <div className='buttons'>
                            { task.completed ? (
                                <button className='completed' onClick={() => handleCompleteChange(task.id)}>Completed</button>
                            ) : (
                                <p className='not-completed'>Not Completed</p>
                            )}
                            { task.completed && <button className='not-completed-button' onClick={() => handleDeleteTask(task.id)}>Delete</button> }
                            { !task.completed && <button className='completed' onClick={() => handleCompleteChange(task.id)}>Complete?</button> }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default AllTasks