import React, { useState } from "react"

function Comment({comment, post, loggedInUser, onHandleDeleteCommentState}) {

    function handleDeleteComment() {
        onHandleDeleteCommentState(comment)
        fetch(`/users/${post.user.id}/posts/${post.id}/comments/${comment.id}`, {
            method: 'DELETE'
        })
        

    }

    return(
        <div className="comment">
            <p>{comment.who_commented} commented:</p>
            {post.user.username === loggedInUser.username || loggedInUser.username === comment.who_commented ?
            <button onClick={handleDeleteComment}>X</button> : null
            }
            

            Comment {comment.comment}
        </div>
    )
}

export default Comment