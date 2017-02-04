import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { TodoForm, TodoList } from './components/todo'
import { addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo } from './lib/todoHelpers'
import { pipe, partial } from './lib/utils'

class App extends Component {
  state = {
    todos: [
      { id: 1, name: 'Walk Pepper', isComplete: true },
      { id: 2, name: 'Workout', isComplete: false },
      { id: 3, name: 'Watch Westie', isComplete: false }
    ],
    currentTodo: ''
  }
  handleRemove = (id, evt) => {
    evt.preventDefault()
    const updatedTodos = removeTodo(this.state.todos, id)
    this.setState({
      todos: updatedTodos
    })
  }
  handleToggle = (id) => {
    const getUpdatedTodos = pipe(findById, toggleTodo, partial(updateTodo, this.state.todos))
    const updatedTodos = getUpdatedTodos(id, this.state.todos)
    this.setState({
      todos: updatedTodos
    })
  }
  handleSubmit = (evt) => {
    evt.preventDefault()
    const newId = generateId()
    const newTodo = {
      id: newId,
      name: this.state.currentTodo,
      isCompleted: false
    }
    const updatedTodos = addTodo(this.state.todos, newTodo)
    this.setState({
      todos: updatedTodos,
      currentTodo: '',
      errorMessage: ''
    })
  }
  handleEmptySubmit = (evt) => {
    evt.preventDefault()
    this.setState({
      errorMessage: 'Please supply a todo name'
    })
  }
  handleInputChange = (evt) => {
    console.log(evt.target.value)
    this.setState({
      currentTodo: evt.target.value
    })
  }
  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Todos</h2>
        </div>
        <div className="Todo-App">
          {this.state.errorMessage && <span className="error">{this.state.errorMessage}</span>}
          <TodoForm
            handleSubmit={submitHandler}
            handleInputChange={this.handleInputChange}
            currentTodo={this.state.currentTodo}
          />
          <TodoList
            todos={this.state.todos}
            handleToggle={this.handleToggle}
            handleRemove={this.handleRemove}
          />
        </div>
      </div>
    );
  }
}

export default App;
