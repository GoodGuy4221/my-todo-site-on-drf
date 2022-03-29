import React from "react";
import axios from "axios";
import './App.css';

import './bootstrap/css/bootstrap.min.css'
import './bootstrap/css/sticky-footer-navbar.css'

import UserList from './components/User';
import Footer from "./components/Footer";
import Navbar from "./components/Menu";


const DOMAIN = 'http://127.0.0.1/api/'
const getUrl = (url) => `${DOMAIN}${url}`


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            navbarItems: [
                {name: 'Пользователи', href: '/'},
                {name: 'Проекты', href: '/'},
                {name: 'TODO', href: '/'}
            ],
            'users': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                this.setState({
                    users: response.data
                })
            }).catch(error => console.error(error))
    }


    render() {
        return (
            <div>
                <Navbar navbarItems={this.state.navbarItems}/>
                <UserList users={this.state.users}/>
                <Footer/>
            </div>
        );
    }
}


export default App;
