// Importa gli hook useState e useRef da React
import { useState, useRef } from 'react'
// Importa il componente Modal
import Modal from './Modal'

// Componente che mostra una modale per modificare un task
export default function EditTaskModal({ show, onClose, task, onSave }) {

    // Stato locale per mantenere una copia modificabile del task
    const [editedTask, setEditedTask] = useState(task)

    // Ref per accedere direttamente al form (serve per submit programmato)
    const editFormRef = useRef()

    // Funzione per aggiornare i campi del task modificato
    const changeEditedTask = (key, event) => {
        // Copia il task precedente e aggiorna il campo specifico
        setEditedTask(prev => ({ ...prev, [key]: event.target.value }))
    }

    // Gestisce il submit del form
    const handleSubmit = e => {
        e.preventDefault()
        // Invia il task modificato al callback ricevuto come prop
        onSave(editedTask)
    }

    // Destruttura i campi principali dal task modificato
    const { title, description, status } = editedTask

    // Ritorna una modale con il form di modifica
    return (
        <Modal
            title='Modifica task' // Titolo della modale
            content={
                <form ref={editFormRef} onSubmit={handleSubmit}>
                    {/* Campo per il titolo del task */}
                    <label>
                        Nome task:
                        <input type="text"
                            value={title}
                            onChange={e => changeEditedTask('title', e)}
                        />
                    </label>
                    {/* Campo per la descrizione */}
                    <label>
                        Descrizione:
                        <textarea
                            value={description}
                            onChange={e => changeEditedTask('description', e)} />
                    </label>
                    {/* Campo per lo stato (To do, Doing, Done) */}
                    <label>
                        Stato:
                        <select type="text"
                            value={status}
                            onChange={e => changeEditedTask('status', e)}
                        >
                            {['To do', 'Doing', 'Done'].map((value, index) => (
                                <option key={index} value={value}>{value}</option>
                            ))}
                        </select>
                    </label>
                </form>
            }
            show={show} // Controlla la visibilità della modale
            onClose={onClose} // Callback per chiusura
            onConfirm={() => editFormRef.current.requestSubmit()} // Submit programmato del form
        />
    )
}