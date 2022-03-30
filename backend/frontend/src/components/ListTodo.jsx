import React from 'react'

const ItemTodo = ({todo}) => {
    return(
        <tr>
            <td>{todo.id}</td>
            <td>{todo.text}</td>
            <td>{todo.project.name}</td>
            <td>{todo.user.username}</td>
            <td>{todo.createdAt}</td>
            <td>{todo.updatedAt}</td>
        </tr>
    )
}

const ListTodo = ({todos}) => {
    return(
        <table className="table">
            <tr>
                <th>Номер</th>
                <th>Текст</th>
                <th>К проекту</th>
                <th>Создатель</th>
                <th>Дата создания</th>
                <th>Дата обновления</th>
                {todos.map(todo => <ItemTodo todo={todo}/>)}
            </tr>
        </table>
    )
}

export default ListTodo
