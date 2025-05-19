import { createContext, useContext } from "react";
import useTask from "../hooks/useTask";

const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {

    const dataTask = useTask()

    return(

        <GlobalContext.Provider value={{...dataTask}}>
            {children}
        </GlobalContext.Provider>
    )

}

const useGlobalContext = () => useContext(GlobalContext)

export { GlobalProvider, useGlobalContext }

