import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import LeftBar from './components/LeftBar'
import { Auth } from './components/Auth'
import Login from './components/Login'
import SignUp from './components/SignUp'
import AddTask from './components/AddTask'
import AllTasks from './components/AllTasks'

function App() {
  return (
    <BrowserRouter>
      <Auth>
        <LeftBar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/add-task" element={<AddTask />}/>
          <Route path="/all-tasks" element={<AllTasks />}/>
        </Routes>
      </Auth>
    </BrowserRouter>
  )
}

export default App
