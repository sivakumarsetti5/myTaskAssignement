import {Component} from 'react'
import {v4} from 'uuid'

import './App.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    taskList: [],
    inputTask: '',
    activeOptionId: tagsList[0].optionId,
    isFilterActive: false,
  }

  onChangeTaskItem = event => {
    this.setState({inputTask: event.target.value})
  }

  onChangeTagItem = event => {
    this.setState({activeOptionId: event.target.value})
  }

  submitTask = event => {
    event.preventDefault()
    const {inputTask, activeOptionId} = this.state
    const tagName = tagsList.filter(each => each.optionId === activeOptionId)
    const newTask = {
      itemId: v4(),
      id: activeOptionId,
      task: inputTask,
      tag: tagName[0].displayText,
      isActive: false,
    }
    this.setState(prevState => ({
      taskList: [...prevState.taskList, newTask],
      inputTask: '',
      activeOptionId: tagsList[0].optionId,
    }))
  }

  onClickTagBtn = optionId => {
    this.setState(prevState => ({
      taskList: prevState.taskList.map(eachTask => {
        if (eachTask.id === optionId) {
          return {...eachTask, isActive: !prevState.isActive}
        }
        return {...eachTask, isActive: false}
      }),
      isFilterActive: !prevState.isFilterActive,
    }))
  }

  getFilteredTagList = () => {
    const {isFilterActive, taskList} = this.state
    if (isFilterActive) {
      return taskList.filter(each => each.isActive === true)
    }
    return taskList
  }

  render() {
    const {activeOptionId, inputTask} = this.state
    const filteredTagList = this.getFilteredTagList()
    const isTaskItems = filteredTagList.length > 0
    // console.log(taskList)
    return (
      <div className="main-container">
        <div className="left-container">
          <h1 className="heading">Create a task!</h1>
          <form onSubmit={this.submitTask} className="form-container">
            <div>
              <label htmlFor="task">Task</label>
              <input
                value={inputTask}
                id="task"
                type="text"
                placeholder="Enter the task here"
                onChange={this.onChangeTaskItem}
              />
            </div>
            <div>
              <label htmlFor="tags">Tags</label>
              <select
                key={activeOptionId}
                id="tags"
                value={activeOptionId}
                onChange={this.onChangeTagItem}
              >
                {tagsList.map(each => (
                  <option key={each.optionId} value={each.optionId}>
                    {each.displayText}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit">Add Task</button>
          </form>
        </div>
        <div className="right-container">
          <h1>Tags</h1>
          <ul className="tags-container">
            {tagsList.map(each => (
              <li key={each.optionId}>
                <button
                  type="button"
                  onClick={() => this.onClickTagBtn(each.optionId)}
                >
                  {each.displayText}
                </button>
              </li>
            ))}
          </ul>
          <h1>Tasks</h1>
          {isTaskItems ? (
            <ul>
              {filteredTagList.map(each => (
                <li className="task-item" key={each.id}>
                  <p>{each.task}</p>
                  <p>{each.tag}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No Tasks Added Yet</p>
          )}
        </div>
      </div>
    )
  }
}

export default App
