import { memo } from "react"

const TaskRow = memo(({ id, title, status, createdAt }) => {
    return (
        <tr className={
            status === 'To do' ? 'table-danger' :
            status === 'Doing' ? 'table-warning' :
            status === 'Done' ? 'table-success' :
            ''
          }>
            <th scope='row'>{id}</th>
            <td>{title}</td>
            <td>{status}</td>
            <td>{createdAt}</td>
        </tr>
    )
})

export default TaskRow