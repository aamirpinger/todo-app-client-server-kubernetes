import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBDataTable } from 'mdbreact';
import { listTodo } from '../../utils/APICalls'
import './ListTodo.css'

class ListTodo extends Component {
    state = {
        todos: {
            columns: [
                {
                    label: '#',
                    field: 'id',
                    sort: 'asc',
                },
                {
                    label: 'Title',
                    field: 'title',
                    sort: 'asc'
                },
                {
                    label: 'Description',
                    field: 'description',
                    sort: 'asc'
                },
                {
                    label: '',
                    field: 'important',
                    sort: 'disabled'
                },
                {
                    label: '',
                    field: 'done',
                    sort: 'disabled'
                },
                {
                    label: '',
                    field: 'delete',
                    sort: 'disabled'
                }

            ],
            rows: [],
            errMessage: ''
        }
    }


    componentDidMount() {
        listTodo()
            .then(todos => {
                this.props.initiateTodo(todos)
            })
            .catch(error => {
                this.setState({ errMessage: error.data.message })
            })

        this.setState((ps) => ({
            todos: {
                ...ps.todos,
                rows: this.props.fillTodoRows()
            }
        })
        )
    }

    static getDerivedStateFromProps(props, state) {
        const rows = props.fillTodoRows()

        return {
            todos: {
                ...state.todos,
                rows,
                errMessage: ''
            }
        }
    }

    render() {
        return (
            <MDBContainer className="todo-table-main" >
                {
                    (this.state.titleError) && <span className="error-text"> ToDo Title cannot be blank.</span>
                }
                <MDBRow>
                    <MDBCol>
                        <MDBDataTable
                            striped
                            bordered
                            small
                            btn
                            data={this.state.todos}
                        />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
};

export default ListTodo;