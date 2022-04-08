import React from "react";
import {Link} from "react-router-dom";
import users from "../images/users.png";
import project from "../images/project.png";
import todo from "../images/todo.png";
import users_ from "../images/users.png";
import logout_ from "../images/logout.png";
import auth_icon from "../images/login.png";

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
                 <ul>
                     <li>{this.state.username || 'User'}</li>
                     <li><Link to='/'><img src={users_} alt=""/>Пользователи</Link></li>
                     <li><Link to='/projects'><img src={project} alt=""/>Проекты</Link></li>
                     <li><Link to='/todos'><img src={todo} alt=""/>ToDo</Link></li>

                     <li>
                         {this.is_auth() ?
                             <Link onClick={() => this.logout()}><img src={logout_} alt="logout"/>Logout</Link> :
                             <Link to='/auth'><img src={auth_icon} alt=""/>Auth</Link>}
                     </li>
                 </ul>
             </ul>
        </nav>
    )
}


export default Menu
