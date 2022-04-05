import React from "react";
import {Link} from "react-router-dom";
import users from "../images/users.png";
import project from "../images/project.png";
import todo from "../images/todo.png";

// const MenuItem = ({item}) => {
//     return (
//         <li>
//             <a className="nav-link" href={item.href}>
//                 <img src={item.image} alt={item.name} title={item.name}/>{item.name}
//             </a>
//         </li>
//     )
// }
//
// const Menu = ({menuItems}) => {
//     return(
//         <ul>
//             {menuItems.map((item) => <MenuItem item={item}/>)}
//         </ul>
//     )
// }
//
// export default Menu

const Menu = () => {
    return(
        <nav>
             <ul>
                 <li><Link to='/'><img src={users} alt=""/>Пользователи</Link></li>
                 <li><Link to='/projects'><img src={project} alt=""/>Проекты</Link></li>
                 <li><Link to='/todos'><img src={todo} alt=""/>ToDo</Link></li>

                 <li>
                     {this.is_auth() ? <button onClick={() => this.logout()}>Logout</button> :
                     <Link to='/auth'>Auth</Link>}
                 </li>

             </ul>
        </nav>
    )
}


export default Menu
