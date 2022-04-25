import React from "react";


class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'project': 1,
            'text': '',
        }
    }

    handleProjectChange(event) {
        console.log(event.target.selectedOptions.item(0).value)
            this.setState({
                'project': event.target.selectedOptions.item(0).value
            })
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.createTodo(this.state)
    }

    render() {
        return (
            <>
            <h1 className='text-center'>Создать новое ToDo</h1>
            <form onSubmit={(event => this.handleSubmit(event))}>
                <select name="project" onChange={(event) => this.handleProjectChange(event)}>
                      {this.props.projects.map((item) => <option value={`${item.id}`}>{item.name}</option>)}
                </select>

                <div className="form-group">
                    <label for="text">Текст (заметка)</label>
                    <input type="text" name="text" placeholder="text"
                           onChange={(event) => this.handleChange(event)}/>
                </div>

                <input type="submit" value="Отправить"/>

            </form>
            </>
        )
    }

}

export default TodoForm
