import Comment from "./Comment"
import React, { useState } from "react"

function Comments({post, user}) {

    const [addedComment, setAddedComment] = useState('')

    return (
        <div className="comments-card">
            <form>
                <input type='text'></input>
                <button>Add Comment</button>
            </form>
            {post.comments ? post.comments.map((comment) => {
                return <Comment comment={comment} post={post} />
            }):null}
        </div>
    )
}

export default Comments