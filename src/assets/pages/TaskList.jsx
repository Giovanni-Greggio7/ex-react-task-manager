import { useMemo, useState } from 'react'
import { useGlobalContext } from '../contexts/GlobalContetx'
import TaskRow from '../components/TaskRow'

export default function TaskList() {

    const { tasks } = useGlobalContext()
    const [sortBy, setSortBy] = useState('createdAt')
    const [sortOrder, setSortOrder] = useState(1)

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

    const ordine = useMemo(() => {

        const copiaData = [...tasks]

        const stato = {
            'To do': 0,
            'Doing': 1,
            'Done': 2
        }

        copiaData.sort((a, b) => {

            if ('title' === sortBy) {
                return a.title.localeCompare(b.title) * sortOrder
            } else if ('status' === sortBy) {
                return (stato[a.status] - stato[b.status]) * sortOrder
            } else {
                return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * sortOrder
            }

        })
        return copiaData

    }, [sortBy, sortOrder, tasks])


    return (
        <>
            <div>
                <h1 className='text-center'>Lista Task</h1>
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
                        {ordine.map(task =>
                            <TaskRow key={task.id} task={task} />
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}