

function Comment({comment, post}) {
    return(
        <div className="comment">
            <p>{post.user.username} commented:</p>
            Comment {comment.comment}
        </div>
    )
}

export default Comment