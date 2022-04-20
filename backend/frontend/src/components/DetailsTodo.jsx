import React from 'react'
import {useParams} from "react-router-dom";

const DetailsTodo = ({todos, deleteTodo}) => {
    console.log(todos)
    let {id} = useParams()
    id = parseInt(id)
    const todo = todos.find(obj => obj.id === id )
    return(
        <div className="container">
        <table className="table">
                <th>Номер</th>
                <th>Статус</th>
                <th>Текст</th>
                <th>К проекту</th>
                <th>Создатель</th>
                <th>Дата создания</th>
                <th>Дата обновления</th>
                <th> </th>
            <tr>
                <td>{todo.id}</td>
                <td>{todo.isActive ? 'Активна' : 'Закрыта'}</td>
                <td>{todo.text}</td>
                <td>{todo.project.name}</td>
                <td>{todo.user.username}</td>
                <td>{todo.createdAt}</td>
                <td>{todo.updatedAt}</td>
                <td><button onClick={()=>deleteTodo(todo.id)} type="button">удалить</button></td>
            </tr>
        </table>
        </div>
    )
}

export default DetailsTodo
