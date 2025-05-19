// Importa la funzione memo da React per ottimizzare il rendering del componente
import { memo } from "react"

// Definisce un componente memoizzato chiamato TaskRow, che riceve le props: id, title, status e createdAt
const TaskRow = memo(({ id, title, status, createdAt }) => {

    // Elimina spazi dal valore di status e lo converte in minuscolo per usarlo come classe CSS
    const taskStatus = status.replace(" ", "").toLowerCase()

    // Ritorna una riga della tabella (<tr>) con le informazioni della task
    return (
        <tr>
            {/* Mostra l'ID della task come intestazione di riga */}
            <th scope='row'>{id}</th>

            {/* Mostra il titolo della task */}
            <td>{title}</td>

            {/* Mostra lo stato della task con una classe dinamica basata sullo stato */}
            <td className={taskStatus}>{status}</td>

            {/* Mostra la data di creazione in formato localizzato */}
            <td>{new Date(createdAt).toLocaleDateString()}</td>
        </tr>
    )
    
})

// Esporta il componente TaskRow come export di default
export default TaskRow