import { memo } from "react"

const TaskRow = memo(({ id, title, status, createdAt }) => {

    const taskStatus = status.replace(" ", "").toLowerCase()

    return (
        <tr>
            <th scope='row'>{id}</th>
            <td>{title}</td>
            <td className={taskStatus}>{status}</td>
            <td>{new Date(createdAt).toLocaleDateString()}</td>
        </tr>
    )
    
})

export default TaskRow