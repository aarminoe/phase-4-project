import Comment from "./Comment"
import React, { useState } from "react"

function Comments({post, loggedInUser}) {

    const [addedComment, setAddedComment] = useState('')
    const [seeComments, setSeeComments] = useState(false)
    const [postComments, setPostComments] = useState(post.comments)

    function handleAddComment(e) {
        e.preventDefault()
        console.log(post)
        fetch(`/users/${post.user.id}/posts/${post.id}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment: addedComment,
                post_id: post.id,
                who_commented: loggedInUser.username
            })
        })
        .then(resp => resp.json())
        .then(data => {
            handleAddNewComment(data)
            setAddedComment('')
        })
    }

    function handleAddNewComment(newComment) {
        const updatedComments = [...postComments, newComment]
        setPostComments(updatedComments)
    }

    function handleDeleteCommentState(deletedComment) {
        const updatedComments = postComments.filter((comment) => {
            return comment !== deletedComment
        })
        setPostComments(updatedComments)
    }

    return (
        
        <div className="comments-card">
            <button onClick={() => setSeeComments((seeComments) => !seeComments)}>See Comments</button>
            {seeComments ? <form onSubmit={handleAddComment}>
                <input type='text' value={addedComment} onChange={(e) => setAddedComment(e.target.value)}></input>
                <button onClick={console.log(post)}>Add Comment</button>
            </form> 
            : null}
            {seeComments ? postComments.map((comment) => {
                return <Comment comment={comment} post={post} loggedInUser={loggedInUser} onHandleDeleteCommentState={handleDeleteCommentState}/>
            }): null}
        </div>
    )
}

export default Comments