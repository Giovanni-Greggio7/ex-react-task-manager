import { useState, useEffect } from 'react'

export default function useTask() {

    const [tasks, setTasks] = useState([])

    const initialValue = {

        title: '',
        description: '',
        status: ''

    }
    const [dataTask, setDataTask] = useState(initialValue)

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

    const addTask = async newTask => {

        const response = await fetch(`${url}/tasks`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(newTask)
        })
        const { success, task, message } = await response.json()
        if (!success) throw new Error(message)

        setDataTask(prev => [...prev, task])

    }

    const removeTask = () => { }

    const updateTask = () => { }

    return { tasks, addTask, removeTask, updateTask }

}