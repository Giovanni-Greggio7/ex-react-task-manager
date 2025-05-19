// Importa createContext e useContext da React per creare e usare un contesto globale
import { createContext, useContext } from "react";

// Importa il custom hook useTask che gestisce la logica delle task
import useTask from "../hooks/useTask";

// Crea un contesto globale chiamato GlobalContext
const GlobalContext = createContext()

// Definisce il provider che avvolge l'app e fornisce i dati del contesto
const GlobalProvider = ({ children }) => {

    // Usa il custom hook per ottenere lo stato e le funzioni relative alle task
    const dataTask = useTask()

    // Ritorna il provider con il valore del contesto che include tutto ciò che viene da useTask
    return(
        <GlobalContext.Provider value={{...dataTask}}>
            {children} {/* Renderizza i componenti figli che hanno accesso al contesto */}
        </GlobalContext.Provider>
    )
}

// Custom hook per accedere facilmente al contesto da altri componenti
const useGlobalContext = () => useContext(GlobalContext)

// Esporta il provider e il custom hook per l'uso in altre parti dell'app
export { GlobalProvider, useGlobalContext }