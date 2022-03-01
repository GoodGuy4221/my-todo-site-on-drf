'use strict';

import React from "react";
import axios from "axios";
import logo from './logo.svg';
import './App.css';

import UserList from './components/User';
import Footer from "./components/Footer";
import Menu from "./components/Menu";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
        // const users = [
        // {
        //     'username': 'ivan',
        //     'first_name': 'Иван,
        //     'last_name': 'Иванов',
        //     'email': 'ivan@yandex.ru'
        // },
        // {
        //     'username': 'petr',
        //     'first_name': 'Петр',
        //     'last_name': 'Петров',
        //     'email': 'petr@yandex.ru'
        // }
        // ]
        // this.setState({users: users})

        axios.get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                this.setState({
                    users: response.data
                })
            }).catch(error => console.error(error))

    }


    render() {
        return (<div>
            <Menu/>
            <UserList users={this.state.users}/>
            <Footer/>
        </div>);
    }
}


export default App;
