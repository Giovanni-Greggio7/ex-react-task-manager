// Importa useContext per accedere ai context React
import { useContext } from 'react'
// Importa useParams per ottenere i parametri dinamici dalla URL
import { useParams } from 'react-router-dom'
// Importa il context globale dove sono salvati i task
import { useGlobalContext } from '../contexts/GlobalContetx'

// Componente che mostra i dettagli di un singolo task
export default function TaskDetail() {

    // Estrai l'id del task dalla URL
    const { id } = useParams()

    // Ottieni la lista dei task dal context globale
    const { tasks } = useGlobalContext()

    // Cerca il task corrispondente all'id (convertito a intero)
    const task = tasks.find(task => task.id === parseInt(id))

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

                    {/* Pulsante per eliminare il task (funzionalità da implementare) */}
                    <button className="btn btn-danger">Elimina task</button>
                </div>
            </div>
        </div>
    )
}