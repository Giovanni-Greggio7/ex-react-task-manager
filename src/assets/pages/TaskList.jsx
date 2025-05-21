import { useCallback, useMemo, useState } from 'react'
import { useGlobalContext } from '../contexts/GlobalContetx'
import TaskRow from '../components/TaskRow'

function debounce(callback, delay) {
    // Variabile timer per gestire il timeout
    let timer

    // Ritorna una funzione che può essere usata per eseguire il debounce
    return ((value) => {
        // Cancella il timeout precedente (se esiste)
        clearTimeout(timer)
        // Imposta un nuovo timeout che esegue la callback dopo il delay
        timer = setTimeout(() => {
            callback(value)
        }, delay)
    })
}

export default function TaskList() {

    const { tasks } = useGlobalContext()
    const [sortBy, setSortBy] = useState('createdAt')
    const [sortOrder, setSortOrder] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')

    const filterAndOrderTask = useCallback(
        debounce(setSearchQuery, 500),
        [])

    function handleClick(element) {

        if (element === sortBy) {
            setSortOrder(prev => prev * -1)
        } else {
            setSortBy(element)
            setSortOrder(1)
        }
        console.log(sortBy)
        console.log(sortOrder)
    }

    const ordineTask = useMemo(() => {

        const filtroTask = tasks.filter(e => {
            return e.title.toLowerCase().includes(searchQuery.toLowerCase())
        })

        const stato = {
            'To do': 0,
            'Doing': 1,
            'Done': 2
        }

        filtroTask.sort((a, b) => {

            if ('title' === sortBy) {
                return a.title.localeCompare(b.title) * sortOrder
            } else if ('status' === sortBy) {
                return (stato[a.status] - stato[b.status]) * sortOrder
            } else {
                return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * sortOrder
            }

        })
        return filtroTask

    }, [sortBy, sortOrder, tasks, searchQuery])


    return (
        <>
            <div>
                <h1 className='text-center'>Lista Task</h1>
                <input type="text"
                    placeholder='Ricerca task'
                    onChange={e => filterAndOrderTask(e.target.value)}
                />
            </div>
            <div>
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" onClick={() => handleClick('title')}>Nome{sortBy === 'title' ? (sortOrder === 1 ? '⬆️' : '⬇️') : ''}</th>
                            <th scope="col" onClick={() => handleClick('status')}>Stato{sortBy === 'status' ? (sortOrder === 1 ? '⬆️' : '⬇️') : ''}</th>
                            <th scope="col" onClick={() => handleClick('createdAt')}>Data di creazione{sortBy === 'createdAt' ? (sortOrder === 1 ? '⬆️' : '⬇️') : ''}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordineTask.map(task =>
                            <TaskRow key={task.id} task={task} />
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}