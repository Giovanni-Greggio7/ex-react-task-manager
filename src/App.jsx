// Importa useState (anche se non usato qui), e i componenti di routing da React Router
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Importa le pagine della tua applicazione
import AddTask from './assets/pages/AddTask'
import TaskList from './assets/pages/TaskList'

// Importa il layout che contiene la struttura comune (es. navbar, footer)
import DefaultLayout from './assets/layout/DefaultLayout'

// Importa il provider del contesto globale per gestire lo stato condiviso
import { GlobalProvider } from './assets/contexts/GlobalContetx'

function App() {

  return (
    <>
      {/* Wrappa tutta l'app con il contesto globale per condividere lo stato */}
      <GlobalProvider>
        {/* Abilita il routing nella tua applicazione */}
        <BrowserRouter>
          {/* Definisce le rotte disponibili */}
          <Routes>
            {/* Layout di default che contiene le rotte annidate */}
            <Route element={<DefaultLayout />}>
              {/* Rotta principale: mostra la lista delle task */}
              <Route path='/' element={<TaskList />} />

              {/* Rotta secondaria: mostra il form per aggiungere task */}
              <Route path='aggiungi-task' element={<AddTask />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App
