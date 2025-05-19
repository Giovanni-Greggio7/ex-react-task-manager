import { useState, useEffect } from 'react'

export default function useTask(){

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

    const addTask = () => {}
    
    const removeTask = () => {}

    const updateTask = () => {}

    return { tasks, addTask, removeTask, updateTask }
    
}