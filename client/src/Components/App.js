import React, { Component, Fragment } from 'react';
import AddTodo from './AddTodo/AddTodo'
import ListTodo from './ListTodo/ListTodo'
import PageLoader from './PageLoader/PageLoader'
import Header from './Header/Header'
import Login from './Login/Login'
import { init } from '../utils/APICalls'
import Signup from './Signup/Signup'
import './App.css'
import { updateTodo, deleteTodo, signout } from '../utils/APICalls'
import { fillTodoRows } from '../utils/Helper'

class App extends Component {
  state = {
    init: true,
    loggedInUser: '',
    token: '',
    todos: [],
    signup: false
  }


  componentDidMount() {
    init()
      .then(user => {
        this.handleLogin(user)
      })
      .catch(error => {
        this.setState({
          init: false
        })
      })
  }

  addTodo = (newTodo) => {
    this.setState((ps) => ({
      todos: [...ps.todos, newTodo]
    }))
  }

  initiateTodo = (todos) => {
    this.setState({ todos })
  }

  fillTodoRows = () => fillTodoRows(this.state.todos, this.handleImportant, this.handleDone, this.handleDelete)

  toggleSignup = () => {
    this.setState((ps) => (
      { signup: !ps.signup }
    ))
  }


  handleImportant = (index, id) => {
    updateTodo(id, !this.state.todos[index].important)
      .then(todo => {
        this.setState((ps) => {
          const newState = ps
          newState.todos[index].important = !newState.todos[index].important
          return newState
        })
      })
      .catch(error => {
        this.setState({ errMessage: error })
      })
  }

  handleDone = (index, id) => {
    updateTodo(id, null, !this.state.todos[index].done)
      .then(todo => {
        this.setState((ps) => {
          const newState = ps
          newState.todos[index].done = !newState.todos[index].done
          return newState
        })
      })
      .catch(error => {
        this.setState({ errMessage: error })
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
      signup: false,
      init: false
    })
  }

  backToLogin = () => {
    this.setState({
      signup: false
    })
  }

  handleDelete = (index, id) => {
    deleteTodo(id)
      .then(todo => {
        this.setState((ps) => ({
          todos: [...ps.todos.splice(0, index), ...ps.todos.splice(1, ps.todos.length)]
        }))
      })
      .catch(error => {
        this.setState({ errMessage: error })
      })
  }

  handleSignout = () => {
    signout()
      .then(user => {
        this.setState({
          loggedInUser: '',
          token: '',
          todos: [],
          signup: false
        })
      })
      .catch(error => {
        this.setState({ errMessage: error })
      })
  }

  render() {
    const userName = (this.state.loggedInUser) ? this.state.loggedInUser.user.name : ""
    return <div className="app-main">
      <Header />
      {(this.state.init) ?
        <PageLoader />
        : (this.state.signup)
          ? <Signup backToLogin={this.backToLogin} signupDone={this.toggleSignup} />
          : (!this.state.loggedInUser)
            ? <Login login={this.handleLogin} signup={this.toggleSignup} />
            : (
              <Fragment>

                <AddTodo
                  userName={userName}
                  addTodo={this.addTodo}
                  signout={this.handleSignout}
                />

                <ListTodo
                  initiateTodo={this.initiateTodo}
                  todos={this.state.todos}
                  fillTodoRows={this.fillTodoRows}
                  handleImportant={this.handleImportant}
                  handleDone={this.handleDone}
                  deleteTodo={this.handleDelete}
                />

              </Fragment>
            )
      }
    </div>

  }
}


export default App;
