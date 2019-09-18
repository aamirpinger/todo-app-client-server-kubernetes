import React, { Component, Fragment } from 'react';
import AddTodo from './AddTodo/AddTodo'
import ListTodo from './ListTodo/ListTodo'
import Header from './Header/Header'
import Login from './Login/Login'
import Signup from './Signup/Signup'
import './App.css'

import { fillTodoRows } from '../utils/Helper'

class App extends Component {
  state = {
    loggedInUser: '',
    token: '',
    todos: [],
    signup: false
  }

  addTodo = (newTodo) => {
    this.setState((ps) => ({
      todos: [...ps.todos, newTodo]
    }))
  }

  fillTodoRows = () => fillTodoRows(this.state.todos, this.handleImportant, this.handleDone, this.deleteTodo)

  toggleSignup = () => {
    this.setState((ps) => (
      { signup: !ps.signup }
    ))
  }

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

  logout = () => {
    this.setState({
      loggedInUser: "",
      token: ""
    })
  }

  handleLogin = (user) => {
    this.setState({
      loggedInUser: user,
      signup: false
    })
  }

  backToLogin = () => {
    this.setState({
      signup: false
    })
  }

  deleteTodo = (index) => {
    this.setState((ps) => ({
      todos: [...ps.todos.splice(0, index), ...ps.todos.splice(1, ps.todos.length)]
    }))
  }
  render() {
    return <div className="app-main">
      <Header />
      {(this.state.signup)
        ? <Signup backToLogin={this.backToLogin} signupDone={this.toggleSignup} />
        : (!this.state.loggedInUser)
          ? <Login login={this.handleLogin} signup={this.toggleSignup} />
          : (
            <Fragment>
              <AddTodo addTodo={this.addTodo} />
              <ListTodo
                todos={this.state.todos}
                fillTodoRows={this.fillTodoRows}
              />
            </Fragment>
          )
      }
    </div>

  }
}


export default App;
