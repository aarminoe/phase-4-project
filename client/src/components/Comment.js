import React, { useState } from "react"

function Comment({comment, post, loggedInUser, onHandleDeleteCommentState, onHandleEditCommentState}) {

    const [seeEditCommentInput, setSeeEditCommentInput] = useState(false)
    const [editCommentText, setEditCommentText] = useState('')

    function handleDeleteComment() {
        onHandleDeleteCommentState(comment)
        fetch(`/users/${post.user.id}/posts/${post.id}/comments/${comment.id}`, {
            method: 'DELETE'
        })     
    }

    function handleEditCommentClick() {
        setSeeEditCommentInput((seeEditCommentInput) => !seeEditCommentInput)
    }

    function handleEditComment(e) {
        e.preventDefault()
        console.log(comment)
        fetch(`/users/${post.user.id}/posts/${post.id}/comments/${comment.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment: editCommentText
            })
        })
        .then(resp => resp.json())
        .then(data => {
            onHandleEditCommentState(data)
            setEditCommentText('')
        })
    }

    return(
        <div className="comment">
            <p className="who-commented">{comment.who_commented} commented:</p>
            {post.user.username === loggedInUser.username || loggedInUser.username === comment.who_commented ?
            <div>
                <button className="comment-delete" onClick={handleDeleteComment}>X</button>
                <button className="comment-edit" onClick={handleEditCommentClick}>🖉 </button>
            </div>
            : null
            }
            {seeEditCommentInput ? 
            <form onSubmit={handleEditComment}>
                <input value={editCommentText} type='text' onChange={(e) => setEditCommentText(e.target.value)} /> 
                <button>Add Edit</button>
            </form>
            : null}
            <div className="comment-text">
                {comment.comment}
            </div>
        </div>
    )
}

export default Comment