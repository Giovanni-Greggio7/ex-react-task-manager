import { useState, useRef, useMemo, useContext } from 'react'
import { useGlobalContext } from '../contexts/GlobalContetx'

export default function AddTask() {

    const [title, setTitle] = useState('')
    const descriptionRef = useRef()
    const statusRef = useRef()

    const { addTask } = useGlobalContext()

    const symbols = "!@#$%^&*()-_=+[]{}|;:'\\,.<>?/`~";

    const isTitleNotValid = useMemo(() => {

        if (!title.trim()) return 'Il titolo non può essere vuoto'
        if (title.trim().split('').some(char => symbols.includes(char))) return 'Il titolo non deve  contenere caratteri speciali'
        return ''

    }, [title])

    const handleSubmit = async event => {

        event.preventDefault()

        let description = descriptionRef.current.value
        let status = statusRef.current.value

        const newTask = {
            title: title.trim(),
            description: description,
            status: status
        }

        try {
            await addTask(newTask)
            alert('Task creata con successo!')
            setTitle('')
            description = ''
            status = ''
        } catch (error) {
            alert(error.message)
        }

        console.log(newTask)

    }

    return (

        <div className="container mt-4">

            <h1 className='text-center mb-4'>Aggiungi Task</h1>

            <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow-sm">

                <label className="form-label d-block mb-3">
                    Nuova task
                    <input
                        type="text"
                        className={`form-control mt-1 ${isTitleNotValid ? 'is-invalid' : title.trim() ? 'is-valid' : ''}`}
                        placeholder='Titolo task'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {isTitleNotValid &&
                        <p className="invalid-feedback d-block">
                            {isTitleNotValid}
                        </p>
                    }
                </label>

                <label className="form-label d-block mb-3">
                    Descrizione
                    <textarea
                        type='text'
                        className="form-control mt-1"
                        placeholder='Breve descrizione'
                        ref={descriptionRef}
                    />
                </label>

                <label className="form-label d-block mb-4">
                    Stato
                    <select className="form-select mt-1" ref={statusRef}>
                        <option value="To do">To do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                </label>

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