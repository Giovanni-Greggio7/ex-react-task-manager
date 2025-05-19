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

        try{
            await addTask(newTask)
            alert('Task creata con successo!')
            setTitle('')
            description = ''
            status = ''
        }catch(error){
            alert(error.message)
        }

        console.log(newTask)

    }

    return (

        <div>

            <h1 className='text-center'>Aggiungi Task</h1>

            <form onSubmit={handleSubmit}>
                <label>Nuova task
                    <input type="text"
                        placeholder='Titolo task'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                    {isTitleNotValid &&
                        <p style={{ color: 'red' }}>
                            {isTitleNotValid}
                        </p>
                    }
                </label>


                <label>Descrizione
                    <textarea type='text'
                        placeholder='Breve descrizione'
                        ref={descriptionRef} />
                </label>

                <label>Stato
                    <select ref={statusRef}>
                        <option value="To do">To do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                </label>


                <button type='submit' disabled={isTitleNotValid}>Aggiungi task</button>
            </form>


        </div>
    )
}