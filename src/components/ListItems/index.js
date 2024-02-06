import {formatDistanceToNow} from 'date-fns'
import {TiEdit} from 'react-icons/ti'

import './index.css'

const ListItems = props => {
  const {listDetails, editList, deleteList} = props

  const {id, name, list, isLiked, initialClassName, date} = listDetails
  const initial = name ? name[0].toUpperCase() : ''
  const likeTextClassName = isLiked ? 'button active' : 'button'
  const likeImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const postedTime = formatDistanceToNow(date)

  const onClickLike = () => {
    const {toggleIsLiked} = props
    toggleIsLiked(id)
  }

  const onDeleteList = () => {
    deleteList(id)
  }

  const onEditList = () => {
    editList(id, name, list)
  }

  return (
    <li className="comment-item">
      <div className="comment-container">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>
        <div>
          <div className="username-time-container">
            <p className="username">{name}</p>
            <p className="time">{postedTime} ago</p>
          </div>
          <p className="comment">{list}</p>
        </div>
      </div>
      <div className="buttons-container">
        <div className="like-container">
          <button
            className={likeTextClassName}
            type="button"
            onClick={onClickLike}
          >
            <img src={likeImageUrl} alt="like" className="like-image" />
            Like
          </button>
        </div>
        <button
          className="button"
          type="button"
          onClick={onDeleteList}
          data-testid="delete"
        >
          <TiEdit className="edit-icon" onClick={onEditList} />

          <img
            className="delete"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr className="comment-line" />
    </li>
  )
}

export default ListItems
