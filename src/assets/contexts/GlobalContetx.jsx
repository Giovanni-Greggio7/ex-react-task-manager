import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {

    const [ tasks, setTasks ] = useState([])

    const url = import.meta.env.VITE_API_URL

    const fetchData = (url) => {
        fetch(`${url}/tasks`)
        .then(response => response.json())
        .then(data => setTasks(data))
        .catch(error => console.error(error))
    }

    useEffect(() => {
        fetchData(url)
    }, [])

    const value = {
        tasks,
        fetchData,
        url
    }

    return(

        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )

}

const useGlobalContext = () => useContext(GlobalContext)

export { GlobalProvider, useGlobalContext }

