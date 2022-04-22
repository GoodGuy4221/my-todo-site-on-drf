import React from "react";


class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            url: '',
            users: []
        }
    }

    handleUserChange(event) {
        if (!event.target.selectedOptions) {
            this.setState({
                'user': []
            })
            return;
        }
        let users = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            users.push(event.target.selectedOptions.item(i).value)
        }

        this.setState({
            'users': users
        })
        console.log(users)
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.createProject(this.state)
    }

    render() {
        return (
            <>
                <h1 className='text-center'>Создание нового проекта</h1>
                <form onSubmit={(event => this.handleSubmit(event))}>
                        <div className='form-group'>
                            <label for='name'>Название</label>
                            <input type='text' name='name' placeholder='name'
                                   onChange={(event) => this.handleChange(event)}/>
                        </div>

                        <div className='form-group'>
                            <label for='url'>Ссылка на репозиторий</label>
                            <input type='url' name='url' placeholder='repo url'
                                   onChange={(event) => this.handleChange(event)}/>
                        </div>

                        <select name="user" multiple onChange={(event) => this.handleUserChange(event)}>
                            {this.props.users.map((item) => <option value={item.id}>{item.username}</option>)}
                        </select>

                        <input type="submit" value="Отправить"/>
                </form>
            </>
        )
    }
}

export default ProjectForm
