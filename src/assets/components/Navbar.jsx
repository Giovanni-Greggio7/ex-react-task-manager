import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <>
            <div>
                <h1 className='text-center'>Task Manager</h1>
            </div>
            <div className='d-flex justify-content-around'>
                <div><Link to='aggiungi-task'>Aggiungi nuove task</Link></div>
                <div><Link to='lista-task'>Lista delle task</Link></div>
            </div>
        </>

    )
}