import React from "react";
import axios from "axios";
import './App.css';
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom'

import UserList from './components/User';
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import ListProjects from "./components/ListProjects";
import ListTodo from "./components/ListTodo";
import NotFound404 from "./components/NotFound404";
import DetailsProject from "./components/DetailsProject";


const DOMAIN = 'http://127.0.0.1:8000/api/'
const getUrl = (url) => `${DOMAIN}${url}`

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
        }
    }

    componentDidMount() {
        axios.get(getUrl('users/'))
            .then(response => {
                this.setState({
                    users: response.data.results
                })
            }).catch(error => console.error(error))

        axios.get(getUrl('projects/'))
            .then(response => {
                this.setState({
                    projects: response.data.results
                })
            }).catch(error => console.error(error))

        axios.get(getUrl('todos/'))
            .then(response => {
                this.setState({
                    todos: response.data.results
                })
            }).catch(error => console.error(error))
    }

    render() {
        const users = this.state.users
        const projects = this.state.projects
        const todos = this.state.todos

        const pathMain = '/'
        const pathProjects = '/projects'
        const pathTodos = '/todos'
        const pathTodosProject = '/todos/project/:id'

        return (
            <>
            <div>
                <BrowserRouter>
                    <Menu/>

                    <Switch>
                        <Route exact path={pathMain} component={() => <UserList users={users}/>}/>
                        <Route exact path={pathProjects} component={() => <ListProjects projects={projects}/>}/>
                        <Route exact path={pathTodos} component={() => <ListTodo todos={todos}/>}/>
                        <Route exact path={pathTodosProject} component={() => <ListTodo todos={todos}/>}/>

                        <Route path='/project/:id' component={
                            () => <DetailsProject projects={projects}/>
                        }/>

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
