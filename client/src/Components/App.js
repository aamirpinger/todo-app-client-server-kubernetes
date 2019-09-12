import React, { Component } from 'react';
import AddTodo from './AddTodo/AddTodo'
import './App.css'

class App extends Component {
  state = {
    todos: []
  }

  addTodo = (newTodo) => {
    this.setState((ps) => ({
      todos: [...ps.todos, newTodo]
    }))
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <AddTodo addTodo={this.addTodo} />
      </div>
    );
  }
}


export default App;
