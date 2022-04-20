import React from "react";
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";

import github_icon from '../images/github.png'

const ItemUser = ({user}) => {
    const linkUserDetails = `/users/${user.id}`
    return (
            <><Link to={linkUserDetails}>{user.username}</Link></>
    )
}


const DetailsProject = ({projects, deleteProject}) => {
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
            <th> </th>
            <tr>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td><a href={project.url} target='_blank'><img src={github_icon} alt="#"/></a></td>
            <td><button onClick={() => deleteProject(project.id)} type="button">удалить</button></td>
            <td>{project.users.map((item) => <ItemUser user={item}/>)}</td>
            </tr>
        </table>
        </div>
    )
}

export default DetailsProject
