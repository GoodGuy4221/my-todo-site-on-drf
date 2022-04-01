import React from "react";


const UserItem = ({user}) => {

    return (
        <tr>
            <td>{user.username}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
        </tr>
    )
}


const UserList = ({users}) => {

    return (
        <main role="main" className="flex-shrink-0">
        <div className="container">
            <table className="table">
                <th>Логин</th>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Email</th>
                {users.map((user) => <UserItem user={user}/>)}
            </table>
        </div>
        </main>
    )
}

export default UserList
