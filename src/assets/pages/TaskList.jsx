import { useState, useEffect } from 'react'
import { useGlobalContext } from '../contexts/GlobalContetx'
import TaskRow from '../components/TaskRow'

export default function TaskList() {

    const { tasks, fetchData } = useGlobalContext()

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <div>
                <h1 className='text-center'>Lista Task</h1>
            </div>
            <div>
                <table class="table text-center">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Stato</th>
                            <th scope="col">Data di creazione</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(task => 
                            <TaskRow key={task.id} {...task}/>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}