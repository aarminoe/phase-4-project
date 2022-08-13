import Comment from "./Comment"
import React, { useState } from "react"

function Comments({post, loggedInUser}) {

    const [addedComment, setAddedComment] = useState('')
    const [seeComments, setSeeComments] = useState(false)
    const [postComments, setPostComments] = useState([...post.comments].reverse())

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
        const updatedComments = [...postComments.reverse(), newComment]
        setPostComments(updatedComments.reverse())
    }

    function handleDeleteCommentState(deletedComment) {
        const updatedComments = postComments.filter((comment) => {
            return comment !== deletedComment
        })
        setPostComments(updatedComments)
    }

    function handleEditCommentState(edittedComment) {
        const updatedComments = postComments.reverse().map((comment) => {
            if (comment.id === edittedComment.id) {
                return {
                    ...comment,
                    comment: edittedComment.comment
                }
            }
            else {
                return comment
            }
        })
        setPostComments(updatedComments.reverse())
    }

    return (
        
        <div className="comments-card">
            <button className="see-comments" onClick={() => setSeeComments((seeComments) => !seeComments)}>See Comments</button>
            {seeComments ? <form onSubmit={handleAddComment}>
                <input type='text' value={addedComment} onChange={(e) => setAddedComment(e.target.value)}></input>
                <button className="see-comments" onClick={console.log(post)}>Add Comment</button>
            </form> 
            : null}
            {seeComments ? postComments.map((comment) => {
                return <Comment comment={comment} post={post} loggedInUser={loggedInUser} onHandleDeleteCommentState={handleDeleteCommentState} onHandleEditCommentState={handleEditCommentState}/>
            }): null}
        </div>
    )
}

export default Comments