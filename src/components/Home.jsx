import './AllTasks.css'
import React, { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, getDocs, query, orderBy, where, getDoc, updateDoc } from 'firebase/firestore'
import { database } from '../firebase'
import { useAuth } from './Auth'
import TaskCard from './TaskCard'

/*
want to only show today's tasks on the home page
*/

function Home() {
    const { authUser } = useAuth();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                //today's date in the format: YYYY-MM-DD
                const today = new Date().toISOString().slice(0, 10);

                // query only the documents whose date is equal to today's date
                let taskQuery = query(collection(database, "tasks"), where("date", "==", today));

                const querySnapshot = await getDocs(taskQuery);
                const taskData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                // filter tasks by userEmail so user can only see their own posts
                const filteredTasks = taskData.filter(task =>
                    task.userEmail === (authUser ? authUser.email:'Guest')
                );

                setTasks(filteredTasks)
            }
            catch (error) {
                console.error("Error fetching posts:", error)
            }
        }

        fetchTasks();
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
        window.alert("Congrats on completing a task!");
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
            <div className='header'>
                {authUser ? (
                    <h1>Hello, {`${authUser.email}`}</h1>
                ) : (
                    <h1>Hello, Guest</h1>
                )}
            </div>
            <h3>Today's tasks are: </h3>
            <div className='tasks-container'>
                {tasks.map(task => (
                    <div className='tasks' key={task.id}>
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

export default Home
