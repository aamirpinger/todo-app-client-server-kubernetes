import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBDataTable } from 'mdbreact';
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
            rows: []
        }
    }


    componentDidMount() {
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
            }
        }
    }

    render() {
        return (
            <MDBContainer className="todo-table-main" >
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