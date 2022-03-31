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
const getUrlParam = (url, param) => `${getUrl(url)}/:${param}`

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'project': {}
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

    getProject(id) {
        console.log('call')
        axios.get(getUrl(`projects/1`))
            .then(response => {
                console.log(id)
                return(response.data)
                // console.log(this.state.project)
            }).catch(error => console.error(`{error}`))
    }

    render() {
        const projects = this.state.projects
        const pathMain = '/'
        const pathProjects = '/projects'
        const pathTodos = '/todos'

        let pathDetailsProject = getUrlParam(pathProjects, 'id')

        return (
            <>
            <div>
                <BrowserRouter>
                    <Menu/>

                    <Switch>
                        <Route exact path={pathMain} component={() => <UserList users={this.state.users}/>}/>
                        <Route exact path={pathProjects} component={() => <ListProjects projects={projects}/>}/>
                        <Route exact path={pathTodos} component={() => <ListTodo todos={this.state.todos}/>}/>

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
