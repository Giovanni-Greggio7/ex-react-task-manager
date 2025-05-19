// Importa gli hook necessari da React
import { useState, useRef, useMemo, useContext } from 'react'
// Importa il context globale per poter accedere a addTask
import { useGlobalContext } from '../contexts/GlobalContetx'

export default function AddTask() {

    // Stato per il titolo della task
    const [title, setTitle] = useState('')
    // Ref per accedere direttamente al valore del campo descrizione
    const descriptionRef = useRef()
    // Ref per accedere direttamente al valore del campo stato
    const statusRef = useRef()

    // Ottiene la funzione addTask dal contesto globale
    const { addTask } = useGlobalContext()

    // Definisce i simboli non ammessi nel titolo
    const symbols = "!@#$%^&*()-_=+[]{}|;:'\\,.<>?/`~";

    // Validazione del titolo tramite useMemo per ottimizzare le prestazioni
    const isTitleNotValid = useMemo(() => {
        if (!title.trim()) return 'Il titolo non può essere vuoto' // Controlla se il titolo è vuoto
        if (title.trim().split('').some(char => symbols.includes(char))) return 'Il titolo non deve  contenere caratteri speciali' // Controlla caratteri speciali
        return '' // Nessun errore
    }, [title]) // Ricalcola solo quando cambia title

    // Funzione per gestire il submit del form
    const handleSubmit = async event => {
        event.preventDefault() // Previene il comportamento di default del form (refresh pagina)

        // Estrae i valori dai campi ref
        let description = descriptionRef.current.value
        let status = statusRef.current.value

        // Crea un oggetto che rappresenta la nuova task
        const newTask = {
            title: title.trim(),
            description: description,
            status: status
        }

        try {
            // Prova ad aggiungere la nuova task tramite addTask del context
            await addTask(newTask)
            alert('Task creata con successo!') // Mostra conferma
            setTitle('') // Resetta lo stato del titolo
            descriptionRef.current.value = '' // Resetta il campo descrizione
            statusRef.current.value = 'To do' // Resetta il campo stato al valore di default
        } catch (error) {
            // In caso di errore, mostra un alert con il messaggio di errore
            alert(error.message)
        }

        console.log(newTask) // Log della nuova task (per debugging)
    }

    return (
        <div className="container mt-4">
            {/* Titolo della pagina */}
            <h1 className='text-center mb-4'>Aggiungi Task</h1>

            {/* Form di inserimento task con stile Bootstrap */}
            <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow-sm">

                {/* Campo titolo task */}
                <label className="form-label d-block mb-3">
                    Nuova task
                    <input
                        type="text"
                        className={`form-control mt-1 ${isTitleNotValid ? 'is-invalid' : title.trim() ? 'is-valid' : ''}`} // Stile dinamico in base alla validazione
                        placeholder='Titolo task'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} // Aggiorna il titolo nello stato
                    />
                    {/* Messaggio di errore, se presente */}
                    {isTitleNotValid &&
                        <p className="invalid-feedback d-block">
                            {isTitleNotValid}
                        </p>
                    }
                </label>

                {/* Campo descrizione */}
                <label className="form-label d-block mb-3">
                    Descrizione
                    <textarea
                        type='text'
                        className="form-control mt-1"
                        placeholder='Breve descrizione'
                        ref={descriptionRef} // Ref per accedere al valore
                    />
                </label>

                {/* Campo stato task */}
                <label className="form-label d-block mb-4">
                    Stato
                    <select className="form-select mt-1" ref={statusRef}> {/* Ref per stato */}
                        <option value="To do">To do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                </label>

                {/* Pulsante di invio, disabilitato se il titolo non è valido */}
                <button
                    type='submit'
                    className="btn btn-primary w-100"
                    disabled={isTitleNotValid}
                >
                    Aggiungi task
                </button>

            </form>
        </div>
    )
}