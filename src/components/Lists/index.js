import {Component} from 'react'
import {v4} from 'uuid'

import ListItems from '../ListItems'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Lists extends Component {
  state = {
    nameInput: '',
    listInput: '',
    listList: [],
    search: '',
    errorMsg: '',
  }

  deleteList = listId => {
    const {listList} = this.state

    this.setState({
      listList: listList.filter(list => list.id !== listId),
    })
  }

  editList = (id, newName, newList) => {
    const {listList} = this.state
    const updatedList = listList.filter(eachData => eachData.id !== id)
    this.setState({
      listList: updatedList,
    })
    this.setState({nameInput: newName})
    this.setState({listInput: newList})
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      listList: prevState.listList.map(eachList => {
        if (id === eachList.id) {
          return {...eachList, isLiked: !eachList.isLiked}
        }
        return eachList
      }),
    }))
  }

  searchInput = event => {
    this.setState({search: event.target.value})
  }

  renderSearchBar = () => (
    <div className="search-input-container">
      <input
        type="search"
        className="search-input"
        onChange={this.searchInput}
      />
      <img
        src="https://assets.ccbp.in/frontend/react-js/destinations-search-icon-img.png "
        alt="search icon"
        className="search-icon"
      />
    </div>
  )

  renderListsList = () => {
    const {listList, search} = this.state
    const searchResults = listList.filter(eachData =>
      eachData.name.toLowerCase().includes(search.toLowerCase()),
    )

    return searchResults.map(eachList => (
      <ListItems
        key={eachList.id}
        listDetails={eachList}
        toggleIsLiked={this.toggleIsLiked}
        deleteList={this.deleteList}
        editList={this.editList}
      />
    ))
  }

  onAddList = event => {
    event.preventDefault()
    const {nameInput, listInput} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newList = {
      id: v4(),
      name: nameInput,
      list: listInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }
    if (nameInput.length === 0 || listInput.length === 0) {
      this.setState({errorMsg: '*Enter Details'})
    } else {
      this.setState(prevState => ({
        listList: [...prevState.listList, newList],
        nameInput: '',
        listInput: '',
        errorMsg: '',
      }))
      localStorage.setItem('listList', JSON.stringify(nameInput, listInput))
    }
  }

  onChangeListInput = event => {
    this.setState({
      listInput: event.target.value,
    })
  }

  onChangeNameInput = event => {
    this.setState({
      nameInput: event.target.value,
    })
  }

  render() {
    const {nameInput, listInput, listList, errorMsg} = this.state
    const itemName = listList.length === 1 ? 'ITEM' : 'ITEMS'
    return (
      <div className="app-container">
        <div className="comments-container">
          <h1 className="app-heading">My Lists</h1>
          <p className="form-description">Create Your Lists</p>
          <div className="comments-inputs">
            <form className="form" onSubmit={this.onAddList}>
              <input
                type="text"
                className="name-input"
                placeholder="Your Name"
                value={nameInput}
                onChange={this.onChangeNameInput}
              />
              <textarea
                placeholder="Enter items..."
                className="comment-input"
                value={listInput}
                onChange={this.onChangeListInput}
                rows="6"
              />
              <p className="error-msg">{errorMsg}</p>
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              src="https://img.freepik.com/premium-vector/hand-put-check-mark-checklis-vector-flat-illustration_385073-292.jpg"
              alt="list"
              className="image"
            />
          </div>
          <hr className="line" />
          <div className="searchCountContainer">
            {this.renderSearchBar()}
            <p className="heading">
              <span className="comments-count">{listList.length}</span>
              {itemName}
            </p>
          </div>

          <ul className="comments-list">{this.renderListsList()}</ul>
        </div>
      </div>
    )
  }
}

export default Lists
