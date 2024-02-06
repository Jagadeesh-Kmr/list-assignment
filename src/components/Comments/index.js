import {Component} from 'react'
import {v4} from 'uuid'

import CommentItem from '../CommentItem'

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

class Comments extends Component {
  state = {
    nameInput: '',
    commentInput: '',
    commentsList: [],
    search: '',
    errorMsg: '',
  }

  deleteComment = commentId => {
    const {commentsList} = this.state

    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== commentId),
    })
  }

  editList = (id, newName, newComment) => {
    const {commentsList} = this.state
    const updatedList = commentsList.filter(eachData => eachData.id !== id)
    this.setState({
      commentsList: updatedList,
    })
    this.setState({nameInput: newName})
    this.setState({commentInput: newComment})
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
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

  renderCommentsList = () => {
    const {commentsList, search} = this.state
    const searchResults = commentsList.filter(eachData =>
      eachData.name.toLowerCase().includes(search.toLowerCase()),
    )

    return searchResults.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
        editList={this.editList}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }
    if (nameInput.length === 0 || commentInput.length === 0) {
      this.setState({errorMsg: '*Enter Details'})
    } else {
      this.setState(prevState => ({
        commentsList: [...prevState.commentsList, newComment],
        nameInput: '',
        commentInput: '',
        errorMsg: '',
      }))
      localStorage.setItem(
        'commentList',
        JSON.stringify(nameInput, commentInput),
      )
    }
  }

  onChangeCommentInput = event => {
    this.setState({
      commentInput: event.target.value,
    })
  }

  onChangeNameInput = event => {
    this.setState({
      nameInput: event.target.value,
    })
  }

  render() {
    const {nameInput, commentInput, commentsList, errorMsg} = this.state
    const itemName = commentsList.length === 1 ? 'ITEM' : 'ITEMS'
    return (
      <div className="app-container">
        <div className="comments-container">
          <h1 className="app-heading">My Lists</h1>
          <p className="form-description">Create Your Lists</p>
          <div className="comments-inputs">
            <form className="form" onSubmit={this.onAddComment}>
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
                value={commentInput}
                onChange={this.onChangeCommentInput}
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
              <span className="comments-count">{commentsList.length}</span>
              {itemName}
            </p>
          </div>

          <ul className="comments-list">{this.renderCommentsList()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments
