import Comment from "./Comment"
import React, { useState } from "react"

function Comments({post, user}) {

    const [addedComment, setAddedComment] = useState('')
    const [seeComments, setSeeComments] = useState(false)

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
                post_id: post.id
            })
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
    }

    return (
        
        <div className="comments-card">
            <button onClick={() => setSeeComments((seeComments) => !seeComments)}>See Comments</button>
            {seeComments ? <form onSubmit={handleAddComment}>
                <input type='text' onChange={(e) => setAddedComment(e.target.value)}></input>
                <button>Add Comment</button>
            </form> 
            : null}
            {seeComments ? post.comments.map((comment) => {
                return <Comment comment={comment} post={post} />
            }): null}
        </div>
    )
}

export default Comments