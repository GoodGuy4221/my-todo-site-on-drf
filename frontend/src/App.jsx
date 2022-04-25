import React from "react";
import axios from "axios";
import './App.css';
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom'
import Cookies from "universal-cookie";

import UserList from './components/User';
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import ListProjects from "./components/ListProjects";
import ListTodo from "./components/ListTodo";
import NotFound404 from "./components/NotFound404";
import DetailsProject from "./components/DetailsProject";
import AuthForm from "./components/Auth";
import DetailsTodo from "./components/DetailsTodo";
import DetailsUser from "./components/DetailsUser";
import TodoForm from "./components/TodoForm";

import users_ from "./images/users.png";
import project from "./images/project.png";
import todo from "./images/todo.png";
import logout_ from "./images/logout.png";
import auth_icon from "./images/login.png"
import ProjectForm from "./components/ProjectForm";

const DOMAIN = 'http://127.0.0.1:8000/api/'
const getUrl = (url) => `${DOMAIN}${url}`

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': '',
            'username': '',
            'redirect_auth': false
        }
    }

    createProject(props) {
        // console.log(props, 'call createProject')
        const headers = this.get_headers()
        const data = {name: props.name, url: props.url, users: props.users}
        console.log(data)
        axios.post('http://127.0.0.1:8000/api/projects/', data, {headers})
            .then(response => {
                this.load_data()
            })
            .catch(error => console.log(error))
    }

    createTodo(props) {
        // console.log(props, 'call createTodo', this.state.users.find(item => item.username === this.state.username).id)
        const headers = this.get_headers()
        const is_active = true
        const user_id = this.state.users.find(item => item.username === this.state.username).id
        const data = {project: props.project, text: props.text, user: user_id, is_active: is_active}
        console.log(data)
        axios.post('http://127.0.0.1:8000/api/todos/', data, {headers})
            .then(response => {
                this.load_data()
            })
            .catch(error => console.log(error))
    }

    deleteTodo(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todos/${id}`, {headers})
            .then(response => {
                this.load_data()
                })
            .catch(error => console.error(error))
    }

    deleteProject(id) {
        console.log(id)
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
            .then(response => {
                this.load_data()
                })
            .catch(error => console.error(error))
    }

    load_data() {
        const headers = this.get_headers()

        axios.get(getUrl('users/'), {headers})
            .then(response => {
                this.setState({
                    users: response.data.results
                })
            }).catch(error => console.error(error))

        axios.get(getUrl('projects/'), {headers})
            .then(response => {
                this.setState({
                    projects: response.data.results
                })
            }).catch(error => console.error(error))

        axios.get(getUrl('todos/'), {headers})
            .then(response => {
                this.setState({
                    todos: response.data.results
                })
            }).catch(error => console.error(error))
    }

    set_name(username) {
        const cookies = new Cookies()
        cookies.set('username', username)
        this.setState({username})
    }

    set_token(token) {
        // localStorage.setItem('token', token)
        // let item = localStorage.getItem('token')
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    get_token(username, password) {
        // console.log('get_token call', username, password)

        axios.post('http://127.0.0.1:8000/api-token-auth/',
            {'username': username, 'password': password})
            .then(response => {
                // console.log(response.data['token'])
                this.set_token(response.data['token'])
                this.set_name(username)
            }).catch(error => alert('Не верный логин или пароль!'))
    }

    is_auth() {
        return !!this.state.token
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json',
        }
        if (this.is_auth()) {
            headers['Authorization'] = `Token ${this.state.token}`
        }
        return headers
    }

    logout() {
        this.set_token('')
        this.set_name('')
    }

    get_token_from_cookies() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }

    get_username_from_cookies_and_set_state() {
        const cookies = new Cookies()
        const username = cookies.get('username')
        if (username) {
            this.setState({'username': username})
            return username
        }
        return null
    }

    get_username() {
        return this.state.username || this.get_username_from_cookies_and_set_state() || 'Anonymous'
    }

    componentDidMount() {
        this.get_token_from_cookies()
    }

    render() {
        const users = this.state.users
        const projects = this.state.projects
        const todos = this.state.todos

        const pathMain = '/'
        const pathProjects = '/projects'
        const pathTodos = '/todos'
        const pathTodosProject = '/todos/project/:id'
        const pathTodoDetails = '/todos/:id'
        const pathUserDetails = '/users/:id'

        return (
            <>
                <div className='container'>
                    <BrowserRouter>
                        <nav>
                            <ul style={{'display': 'flex', 'justify-content': 'center'}}>
                                <li><Link to='/'><img src={users_} alt="#"/>Пользователи</Link></li>
                                <li><Link to='/projects'><img src={project} alt="#"/>Проекты</Link></li>
                                <li><Link to='/todos'><img src={todo} alt="#"/>ToDo</Link></li>

                                <li>
                                    {this.is_auth() ? <Link onClick={() => this.logout()}><img src={logout_}
                                                                                               alt="logout"/>Logout</Link> :
                                        <Link to='/auth'><img src={auth_icon} alt=""/>Auth</Link>}
                                </li>
                                <li>{this.get_username()}</li>
                            </ul>
                        </nav>

                        <Switch>
                            <Route exact path='/todos/create' component={() => <TodoForm projects={this.state.projects}
                            createTodo={(project, text) => this.createTodo(project, text)}/>}/>

                            <Route exact path={pathMain} component={() => <UserList users={users}/>}/>

                            <Route exact path={pathProjects} component={() => <ListProjects projects={projects}
                                                            deleteProject={(id) => this.deleteProject(id)}/>}/>

                            <Route exact path={pathTodos} component={() => <ListTodo todos={todos}
                                                                    deleteTodo={(id) => this.deleteTodo(id)}/>}/>

                            <Route exact path={pathTodosProject} component={() => <ListTodo todos={todos}/>}/>

                            <Route path={pathTodoDetails} component={() => <DetailsTodo todos={todos}
                                                                    deleteTodo={(id) => this.deleteTodo(id)}/>}/>

                            <Route path={pathUserDetails} component={() => <DetailsUser users={users}/>}/>

                            <Route exact path='/auth' component={() =>
                                <AuthForm get_token={(username, password) => this.get_token(username, password)}/>}/>

                            <Route path='/project/:id' component={
                                () => <DetailsProject projects={projects} deleteProject={(id) => this.deleteProject(id)}/>
                            }/>

                            <Route exact path='/projects/create' component={() => <ProjectForm users={this.state.users}
                            createProject={(name, url, users) => this.createProject(name, url, users)}/>}/>

                            <Redirect from='/project' to={pathProjects}/>
                            <Route component={NotFound404}/>
                        </Switch>

                        <Footer/>
                    </BrowserRouter>
                </div>
            </>
        );
    }
}


export default App;
