// Importa useContext per accedere ai context React
import { useContext, useState } from 'react'
// Importa useParams per ottenere i parametri dinamici dalla URL
// Importa useNavigate per eseguire una navigazione programmata dopo l'eliminazione
import { useParams, useNavigate } from 'react-router-dom'
// Importa il context globale dove sono salvati i task
import { useGlobalContext } from '../contexts/GlobalContetx'
import Modal from '../components/Modal'
import EditTaskModal from '../components/EditTaskModal'

// Componente che mostra i dettagli di un singolo task
export default function TaskDetail() {

    const [show, setShow] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    // Estrai l'id del task dalla URL
    const { id } = useParams()

    // Ottieni la lista dei task dal context globale
    const { tasks, removeTask, updateTask } = useGlobalContext()

    // Hook per la navigazione programmata (es. dopo eliminazione)
    const navigate = useNavigate()

    // Cerca il task corrispondente all'id (convertito a intero)
    const task = tasks.find(task => task.id === parseInt(id))

    // Funzione che gestisce l'eliminazione del task
    const handleDelete = async () => {
        try {
            // Chiama la funzione per rimuovere il task
            await removeTask(id)
            // Mostra conferma all'utente
            alert('Task eliminata con successo!')
            // Naviga alla home dopo l'eliminazione
            navigate('/')
        } catch (error) {
            // Mostra errore se qualcosa va storto
            alert(error.message)
        }

        // Log dei task (opzionale, utile per debug)
        console.log(tasks)
    }

    const handleUpdate = async updatedTask => {

        try{
            await updateTask(updatedTask)
            setShowEditModal(false)
        }catch(error){
            console.error(error)
            alert(error.message)
        }
    }

    // Se il task non esiste, mostra un messaggio di errore
    if (!task) {
        return (
            <div className="container mt-5">
                <h2 className="text-danger">Task non trovata</h2>
            </div>
        )
    }

    // Se il task esiste, mostra i suoi dettagli
    return (
        <div className="container mt-5">
            {/* Card Bootstrap per un layout elegante */}
            <div className="card shadow-sm">
                <div className="card-body">
                    {/* Titolo principale */}
                    <h1 className="card-title mb-4">Dettaglio Task</h1>

                    {/* Nome del task */}
                    <h3 className="mb-3">
                        <strong>Nome: {task.title}</strong>
                    </h3>

                    {/* Descrizione del task */}
                    <p className="mb-2"><strong>Descrizione:</strong> {task.description}</p>

                    {/* Stato del task */}
                    <p className="mb-2"><strong>Stato:</strong> {task.status}</p>

                    {/* Data di creazione, formattata come data leggibile */}
                    <p className="mb-4"><strong>Data di creazione:</strong> {new Date(task.createdAt).toLocaleDateString()}</p>

                    {/* Pulsante che attiva la funzione di eliminazione */}
                    <button className="btn btn-danger" onClick={() => setShow(true)}>Elimina task</button>
                    <button className="btn btn-danger" onClick={() => setShowEditModal(true)}>Modifica task</button>
                    <Modal
                        title='Rimuovere la task:'
                        content={task.title}
                        show={show}
                        onClose={() => setShow(false)}
                        onConfirm={handleDelete} />

                    <EditTaskModal
                        task={task}
                        show={showEditModal}
                        onClose={() => setShowEditModal(false)}
                        onSave={handleUpdate} />
                    

                </div>
            </div>
        </div>
    )
}