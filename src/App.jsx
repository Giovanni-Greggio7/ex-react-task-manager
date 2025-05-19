import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddTask from './assets/pages/AddTask'
import TaskList from './assets/pages/TaskList'
import DefaultLayout from './assets/layout/DefaultLayout'

import { GlobalProvider } from './assets/contexts/GlobalContetx'


function App() {


  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path='/' element={<TaskList />} />
              <Route path='aggiungi-task' element={<AddTask />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App
