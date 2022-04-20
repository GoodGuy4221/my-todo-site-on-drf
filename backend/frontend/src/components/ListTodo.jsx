import React from 'react'
import {Link} from 'react-router-dom'

import NoAuth from "./NoAuth";

import details_icons from '../images/details.png'

const ItemTodo = ({todo, deleteTodo}) => {
    const linkTodoDetails = `/todos/${todo.id}`
    const linkUserCreate = `/users/${todo.user.id}`
    const linkProjectDetails = `/project/${todo.project.id}`
    return (
        <tr>
            <td>{todo.id}</td>
            <td>{todo.isActive ? 'Активна' : 'Закрыта'}</td>
            <td>{todo.text.slice(0, 21)}</td>
            <td><Link to={linkProjectDetails}>{todo.project.name}</Link></td>
            <td><Link to={linkUserCreate}>{todo.user.username}</Link></td>
            <td>{todo.createdAt}</td>
            <td>{todo.updatedAt}</td>
            <td><Link to={linkTodoDetails}><img src={details_icons} alt="#"/></Link></td>
            <td><button onClick={()=>deleteTodo(todo.id)} type="button">удалить</button></td>
        </tr>
    )
}

const ListTodo = ({todos, deleteTodo}) => {
    if (todos.length === 0) {
        return (
            <NoAuth/>
        )
    }

    return (
        <div className="container">
            <table className="table">
                <th>Номер</th>
                <th>Статус</th>
                <th>Текст (Начало)</th>
                <th>К проекту</th>
                <th>Создатель</th>
                <th>Дата создания</th>
                <th>Дата обновления</th>
                <th>Подробнее</th>
                <th> </th>
                {todos.map((todo) => <ItemTodo todo={todo} deleteTodo={deleteTodo}/>)}

                <Link to='/todos/create'>Создать</Link>
            </table>
        </div>
    )
}

export default ListTodo
