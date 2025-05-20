// Importa la funzione memo da React per ottimizzare il rendering del componente
import { memo } from "react"
import { Link } from "react-router-dom"

// Definisce un componente memoizzato chiamato TaskRow, che riceve la prop task
const TaskRow = memo(({ task }) => {

    // Elimina spazi dal valore di status e lo converte in minuscolo per usarlo come classe CSS
    const taskStatus = task.status.replace(" ", "").toLowerCase()

    // Ritorna una riga della tabella (<tr>) con le informazioni della task
    return (
        <tr>
            {/* Mostra l'ID della task come intestazione di riga */}
            <th scope='row'>{task.id}</th>

            {/* Mostra il titolo della task */}
            <td><Link to={`/tasks/${task.id}`}>{task.title}</Link></td>

            {/* Mostra lo stato della task con una classe dinamica basata sullo stato */}
            <td className={taskStatus}>{task.status}</td>

            {/* Mostra la data di creazione in formato localizzato */}
            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
        </tr>
    )
    
})

// Esporta il componente TaskRow come export di default
export default TaskRow