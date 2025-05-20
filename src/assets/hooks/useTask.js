// Importa gli hook useState e useEffect da React
import { useState, useEffect } from 'react'

// Definisce un custom hook chiamato useTask
export default function useTask() {

    // Stato per contenere l'elenco delle task
    const [tasks, setTasks] = useState([])

    // Ottiene l'URL dell'API dall'ambiente (es. VITE_API_URL nel .env)
    const url = import.meta.env.VITE_API_URL

    // Funzione per recuperare le task dal server
    const fetchData = (url) => {
        fetch(`${url}/tasks`) // Richiesta GET all'endpoint /tasks
            .then(response => response.json()) // Converte la risposta in JSON
            .then(data => setTasks(data)) // Aggiorna lo stato con le task ricevute
            .catch(error => console.error(error)) // Gestisce eventuali errori
    }

    // useEffect esegue fetchData solo al primo render
    useEffect(() => {
        fetchData(url)
    }, [tasks])

    // Funzione asincrona per aggiungere una nuova task
    const addTask = async newTask => {

        // Invio della richiesta POST all'endpoint /tasks
        const response = await fetch(`${url}/tasks`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(newTask) // Invio del corpo della richiesta in JSON
        })

        // Destruttura la risposta JSON
        const { success, task, message } = await response.json()

        // Se la richiesta non ha avuto successo, lancia un errore con il messaggio
        if (!success) throw new Error(message)

        // Se la task è stata creata con successo, aggiornala nello stato
        setTasks(prev => [...prev, task])
    }

    // Placeholder per rimuovere una task (funzionalità da implementare)
    const removeTask = async id => {

        const response = await fetch(`${url}/tasks/${id}`, {
            method: 'DELETE',
        })

        // Destruttura la risposta JSON
        const { success, message } = await response.json()

        // Se la richiesta non ha avuto successo, lancia un errore con il messaggio
        if (!success) throw new Error(message)

        // Se la task è stata creata con successo, aggiornala nello stato
        setTasks(prev => [...prev])
    }

    // Placeholder per aggiornare una task (funzionalità da implementare)
    const updateTask = () => { }

    // Restituisce le task e le funzioni per gestirle
    return { tasks, addTask, removeTask, updateTask }
}