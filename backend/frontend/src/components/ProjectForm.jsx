import React from "react";

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            url: '',
            // users: []
            users: props?.users?.[0]?.id
        }
    }

    changeHandler(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    submitHandler(event) {
        event.preventDefault()
        this.props.createProject(this.state)
    }

    render() {
        return (
            <div>
                <h1 className='text-center'>Создание нового проекта</h1>
                <form className='col-2 text-center mx-auto w-10' onSubmit={(event => this.submitHandler(event))}>
                    <div className='form-group'>
                        <div className='form-group'>
                            <label htmlFor='Name'>Название</label>
                            <input type='text' placeholder='Project name' id='Name' name='name'
                                   className='form-control'
                                   onChange={(event) => this.changeHandler(event)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='url'>Ссылка на репозиторий</label>
                            <input type='text' placeholder='Project URL' id='url' name='url'
                                   className='form-control'
                                   onChange={(event) => this.changeHandler(event)}
                            />
                        </div>

                        {/*<div className='form-group'>*/}
                        {/*    <label htmlFor='users'>Пользователи участвующие в проекте</label>*/}
                        {/*    <select id='users' name="users" className='form-control'*/}
                        {/*            onChange={(event) => this.changeHandler(event)}>*/}
                        {/*        {this.users.map((item) => <option value={item.id}>{item.username}</option>)}*/}
                        {/*    </select>*/}
                        {/*</div>*/}

                        <button className='btn btn-success' type='submit'>Создать</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default ProjectForm
