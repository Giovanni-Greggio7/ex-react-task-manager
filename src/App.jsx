import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddTask from './assets/pages/AddTask'
import TaskList from './assets/pages/TaskList'
import HomePage from './assets/pages/HomePage'
import Navbar from './assets/components/Navbar'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='lista-task' element={<TaskList/>}/>
          <Route path='aggiungi-task' element={<AddTask/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
