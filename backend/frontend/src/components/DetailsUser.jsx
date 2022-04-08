import React from 'react'
import {useParams} from "react-router-dom";

import user_icon from '../images/user.png'

const DetailsUser = ({users}) => {
    let {id} = useParams()
    id = parseInt(id)
    const user = users.find(obj => obj.id === id )
    const date = new Date(user.dateJoined)
    const dateJoined = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`

    return(
        <div className="container">
        <table className="table">
                <th>Номер</th>
                <th>Логин</th>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Эл. Почта</th>
                <th>Сотрудник</th>
                <th>Дата регистрации</th>
                <th>Фото</th>
            <tr>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.first_name ? user.first_name : 'No Data'}</td>
                <td>{user.last_name ? user.last_name : 'No Data'}</td>
                <td>{user.email}</td>
                <td>{user.isActive ? 'ДА' : 'НЕТ'}</td>
                <td>{dateJoined}</td>
                <td><img src={user.image} alt="#" title='user'/></td>
            </tr>
        </table>
        </div>
    )
}

export default DetailsUser
