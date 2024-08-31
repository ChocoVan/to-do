import './TaskCard.css'
import React, { useEffect, useState } from 'react'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { database } from '../firebase'
import { useParams } from 'react-router-dom';

function TaskCard({ task }) {
    const {
        toDo,
        date,
        completed
    } = task;

    return (
        <div className="card">
            <div className='info-container'>
                <h3>{toDo}</h3>
                <p>{date}</p>
            </div>
        </div>
    )

}

export default TaskCard