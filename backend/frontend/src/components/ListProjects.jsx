import React from "react";

import github from '../images/github.png'
import details from '../images/details.png'

// const ItemUser = ({user}) => {
//     //  СТРОКА УЧАСТНИКОВ ПРОЕКТА
//     return (
//         <li>
//             <span>{user.username}{user.email}<a href="/">Подробнее</a></span>
//         </li>
//     )
// }

const ItemProject = ({item}) => {
    let detailProjectLink = `http://127.0.0.1:8000/api/projects/${item.id}`
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td><a href={item.url} target="_blank"><img src={github} alt="github"/></a></td>
            {/*<td><Link to={detailProjectLink}>Подробнее</td>*/}
            <td><a href={detailProjectLink}><img src={details} alt="details"/></a></td>
        </tr>
    )
}

const ListProjects = ({projects}) => {
    console.log(`GSDFFASDFGSFFDASG${projects}`)
    return(
        <div className="container">
        <table className="table">
            <th>Номер</th>
            <th>Название</th>
            <th>Ссылка на репозиторий</th>
            <th>Детальная информация о проекте</th>
            {projects.map((item) => <ItemProject item={item}/>)}
        </table>
        </div>
        )
}

export default ListProjects
