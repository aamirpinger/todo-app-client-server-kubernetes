import React, { Component } from 'react';
import AddTodo from './AddTodo/AddTodo'
import ListTodo from './ListTodo/ListTodo'
import Header from './Header/Header'
import './App.css'
import { fillTodoRows } from '../utils/Helper'

class App extends Component {
  state = {
    todos: []
  }

  addTodo = (newTodo) => {
    this.setState((ps) => ({
      todos: [...ps.todos, newTodo]
    }))
  }

  fillTodoRows = () => fillTodoRows(this.state.todos, this.handleImportant, this.handleDone, this.deleteTodo)

  handleImportant = (index) => {
    this.setState((ps) => {
      const newState = ps
      newState.todos[index].important = !newState.todos[index].important
      return newState
    })
  }

  handleDone = (index) => {
    this.setState((ps) => {
      const newState = ps
      newState.todos[index].done = !newState.todos[index].done
      return newState
    })
  }

  deleteTodo = (index) => {
    this.setState((ps) => ({
      todos: [...ps.todos.splice(0, index), ...ps.todos.splice(1, ps.todos.length)]
    }))
  }
  render() {
    return (
      <div className="app-main">
        <Header />
        <AddTodo addTodo={this.addTodo} />
        <ListTodo
          todos={this.state.todos}
          fillTodoRows={this.fillTodoRows}
        />
      </div>
    );
  }
}


export default App;
