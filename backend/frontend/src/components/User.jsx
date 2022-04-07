import React from "react";
import {Link} from 'react-router-dom'

import details_icons from '../images/details.png'

import NoAuth from "./NoAuth";


const UserItem = ({user}) => {
    let linkDetailsUser = `/users/${user.id}`

    return (
        <tr>
            <td>{user.username}</td>
            <td>{user.first_name ? user.first_name : 'No Data'}</td>
            <td>{user.first_name ? user.first_name : 'No Data'}</td>
            <td>{user.email}</td>
            <td><Link to={linkDetailsUser}><img src={details_icons} alt="#"/></Link></td>
        </tr>
    )
}


const UserList = ({users}) => {
    if (users.length === 0){
        return (
            <NoAuth/>
        )
    }

    return (
        <main role="main" className="flex-shrink-0">
        <div className="container">
            <table className="table">
                <th>Логин</th>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Email</th>
                <th>Подробнее</th>
                {users.map((user) => <UserItem user={user}/>)}
            </table>
        </div>
        </main>
    )
}

export default UserList
