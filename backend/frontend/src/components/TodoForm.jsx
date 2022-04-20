import React from "react";

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'project': 1,
            'text': '',
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(event.target.name, event.target.value)
    }

    handleSubmit(event) {
        console.log('handleSubmit call', this.state.project, this.state.text, this.state.user_id, this.state.is_active)
        this.props.createTodo(this.state)
        event.preventDefault()
    }

    render() {
        return (
            <>
            <h1 className='text-center'>Создать новое ToDo</h1>
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="project">Идентификатор проекта</label>
                    <input type="number" name="project" placeholder="project id" id="project"
                           onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="text">Текст (заметка)</label>
                    <input type="text" name="text" placeholder="text" id="text"
                           onChange={(event) => this.handleChange(event)}/>
                </div>

                    <input type="submit" value="Отправить"/>

            </form>
            </>
        )
    }

}

export default TodoForm
