import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      filter: "all",
      newText: ""
    }
    this.nextID = 0;
  }
  newTask(event) {
    event.preventDefault();
    if(this.state.newText) {
      this.setState({
        tasks: [...this.state.tasks, {
          text: this.state.newText,
          id: this.nextID++,
          completed: false
        }],
        newText: "",
        filter: "all"
      });
    }
  }
  updateNewText(event) {
    this.setState({
      newText: event.target.value
    });
  }
  completeTask(idx) {
    let tasks = this.state.tasks;
    tasks[idx].completed = true;
    this.setState({tasks});
  }
  removeCompleted() {
    this.setState({
      tasks: this.state.tasks.filter(task => !task.completed)
    });
  }
  setFilter(set) {
    this.setState({
      filter: set
    });
  }
  render() {
    return (
      <div className="App">
        <form onSubmit={this.newTask.bind(this)}>
          <input type="text" value={this.state.newText} onChange={this.updateNewText.bind(this)} />
        </form>
        {this.state.tasks.filter(task => {
          if(this.state.filter === "active") {
            return !task.completed;
          }
          else if(this.state.filter === "completed") {
            return task.completed;
          }
          else {
            return true;
          }
        }).map((task, idx) => (
          <div key={task.id}>
            <span style={{textDecorationLine: task.completed ? "line-through" : "none"}}>
              {task.text}
            </span>
            <button style={{display: task.completed ? "none" : "inline-block"}} onClick={() => this.completeTask(idx)}>
              Complete
            </button>
          </div>
        ))}
        <p>
          {this.state.tasks.filter(task => !task.completed).length} Tasks remaining. Showing {this.state.filter}:
          <button onClick={()=>this.setFilter("all")}>All</button>
          <button onClick={()=>this.setFilter("active")}>Active</button>
          <button onClick={()=>this.setFilter("completed")}>Completed</button>
        </p>
        <button style={{display: this.state.tasks.length ? "inline-block" : "none"}} onClick={this.removeCompleted.bind(this)}>
          Remove completed
        </button>
      </div>
    );
  }
}

export default App;
