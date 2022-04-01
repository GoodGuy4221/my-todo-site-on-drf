import React from "react";
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";

const ItemUser = ({user}) => {
    return (
            <><span>{user.username}{user.email}<a href="/">Подробнее</a></span><br/></>
    )
}


const DetailsProject = ({projects}) => {
    let {id} = useParams()
    id = parseInt(id)
    const project = projects.find(obj => obj.id === id )
    return(
        <div className="container">
        <table className="table">
            <th>Номер</th>
            <th>Название</th>
            <th>Ссылка на репозиторий</th>
            <th>Участники проекта</th>
            <tr>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.url}</td>
            <td>{project.users.map((item) => <ItemUser user={item}/>)}</td>
            </tr>
        </table>
        </div>
    )
}

export default DetailsProject
