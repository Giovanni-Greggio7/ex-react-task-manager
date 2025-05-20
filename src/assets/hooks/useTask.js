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

    // useEffect esegue fetchData ogni volta che cambia l'array "tasks" (⚠️ attenzione: può causare loop infinito)
    // In pratica viene eseguito ad ogni modifica dello stato, quindi chiamerà fetchData ripetutamente.
    // Dovresti usare una dipendenza vuota [] se vuoi chiamarlo solo al primo render.
    useEffect(() => {
        fetchData(url)
    }, [tasks]) // ⚠️ Attenzione: dipendenza su `tasks` può causare richieste infinite

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

    // Funzione asincrona per eliminare un task dal backend e aggiornare lo stato locale
    const removeTask = async id => {

        // Invia una richiesta HTTP DELETE all'endpoint specifico del task da eliminare
        const response = await fetch(`${url}/tasks/${id}`, {
            method: 'DELETE', // Specifica il metodo HTTP
        })

        // Estrae il risultato della risposta come JSON e destruttura "success" e "message"
        const { success, message } = await response.json()

        // Se il backend indica che la rimozione non è andata a buon fine, genera un errore
        if (!success) throw new Error(message)

        // Aggiorna lo stato dei task rimuovendo quello con l'id specificato
        // Nota: parseInt è usato se id è una stringa
        setTasks(prev => prev.filter(task => task.id !== parseInt(id)))
    }

    // Funzione asincrona per aggiornare una task esistente nel backend e nello stato locale
    const updateTask = async updatedTask => {

        // Invia una richiesta PUT all'endpoint con l'id della task da aggiornare
        const response = await fetch(`${url}/tasks/${updatedTask.id}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(updatedTask) // Corpo della richiesta in formato JSON
        })

        // Estrae il risultato della risposta
        const { success, message, task: newTask } = await response.json()

        // In caso di errore, genera un'eccezione con il messaggio ricevuto
        if (!success) throw new Error(message)

        // Aggiorna la task corrispondente nello stato
        setTasks(prev => prev.map(oldTask => oldTask.id === newTask.id ? newTask : oldTask))
    }

    // Restituisce le task e le funzioni per gestirle (aggiunta, rimozione, aggiornamento)
    return { tasks, addTask, removeTask, updateTask }
}