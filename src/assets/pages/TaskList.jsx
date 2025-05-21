import { useCallback, useMemo, useState } from 'react'
import { useGlobalContext } from '../contexts/GlobalContetx'
import TaskRow from '../components/TaskRow'

// Funzione debounce per ritardare l'esecuzione di una callback
function debounce(callback, delay) {
    let timer
    return ((value) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            callback(value)
        }, delay)
    })
}

export default function TaskList() {

    // Recupero dei task dal contesto globale
    const { tasks } = useGlobalContext()

    // Stato per ordinamento e filtro
    const [sortBy, setSortBy] = useState('createdAt') // Campo di ordinamento
    const [sortOrder, setSortOrder] = useState(1) // Ordine: 1 = crescente, -1 = decrescente
    const [searchQuery, setSearchQuery] = useState('') // Stato per la ricerca

    // Funzione debounced per aggiornare la query di ricerca
    const filterAndOrderTask = useCallback(
        debounce(setSearchQuery, 500), // Esegue setSearchQuery dopo 500ms di inattività
        []
    )

    // Gestione del click sull'intestazione della tabella per ordinare
    function handleClick(element) {
        if (element === sortBy) {
            setSortOrder(prev => prev * -1) // Inverte l'ordine se si clicca lo stesso campo
        } else {
            setSortBy(element) // Cambia il campo di ordinamento
            setSortOrder(1) // Ordine crescente di default
        }
        console.log(sortBy)
        console.log(sortOrder)
    }

    // Memoizzazione dell'elenco filtrato e ordinato
    const ordineTask = useMemo(() => {
        // Filtro dei task in base alla ricerca (case-insensitive)
        const filtroTask = tasks.filter(e => {
            return e.title.toLowerCase().includes(searchQuery.toLowerCase())
        })

        // Mappa dei valori numerici per lo stato (utile per l'ordinamento)
        const stato = {
            'To do': 0,
            'Doing': 1,
            'Done': 2
        }

        // Ordinamento dei task filtrati in base al campo selezionato
        filtroTask.sort((a, b) => {
            if ('title' === sortBy) {
                return a.title.localeCompare(b.title) * sortOrder
            } else if ('status' === sortBy) {
                return (stato[a.status] - stato[b.status]) * sortOrder
            } else {
                return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * sortOrder
            }
        })

        // Restituisce l'array filtrato e ordinato
        return filtroTask

    }, [sortBy, sortOrder, tasks, searchQuery])

    return (
        <>
            <div>
                <h1 className='text-center'>Lista Task</h1>
                {/* Input non controllato (senza value) per usare debounce */}
                <input
                    type="text"
                    placeholder='Ricerca task'
                    onChange={e => filterAndOrderTask(e.target.value)}
                />
            </div>
            <div>
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            {/* Le intestazioni permettono di ordinare cliccando */}
                            <th scope="col" onClick={() => handleClick('title')}>
                                Nome{sortBy === 'title' ? (sortOrder === 1 ? '⬆️' : '⬇️') : ''}
                            </th>
                            <th scope="col" onClick={() => handleClick('status')}>
                                Stato{sortBy === 'status' ? (sortOrder === 1 ? '⬆️' : '⬇️') : ''}
                            </th>
                            <th scope="col" onClick={() => handleClick('createdAt')}>
                                Data di creazione{sortBy === 'createdAt' ? (sortOrder === 1 ? '⬆️' : '⬇️') : ''}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Visualizza i task filtrati e ordinati */}
                        {ordineTask.map(task =>
                            <TaskRow key={task.id} task={task} />
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}