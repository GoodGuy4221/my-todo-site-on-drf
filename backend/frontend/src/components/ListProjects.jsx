import React from "react";
import {Link} from "react-router-dom";

import github from '../images/github.png'
import details from '../images/details.png'
import checklist from '../images/checklist.png'

import NoAuth from "./NoAuth";

const ItemProject = ({item, deleteProject}) => {
    let itemDetailsLink = `/project/${item.id}`
    let todosProject = `/todos/project/${item.id}`
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td><a href={item.url} target="_blank"><img src={github} alt="github"/></a></td>
            <td><Link to={todosProject}><img src={checklist} alt="#"/></Link></td>
            <td><Link to={itemDetailsLink}><img src={details} alt="#"/></Link></td>
            <td><button onClick={() => deleteProject(item.id)} type="button">удалить</button></td>
        </tr>
    )
}

const ListProjects = ({projects, deleteProject}) => {
    if (projects.length === 0) {
        return (
            <NoAuth/>
        )
    }

    return (
        <div className="container">
            <table className="table">
                <th>Номер</th>
                <th>Название</th>
                <th>Ссылка на репозиторий</th>
                <th>ToDos</th>
                <th>Детальная информация о проекте</th>
                <th> </th>
                {projects.map((item) => <ItemProject item={item} deleteProject={deleteProject}/>)}

                <Link to='/projects/create'>Создать</Link>
            </table>
        </div>
    )
}

export default ListProjects
