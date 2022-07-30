

function Comment({comment, user}) {
    return(
        <div className="comment">
            <p>{user.username} commented:</p>
            Comment {comment.comment}
        </div>
    )
}

export default Comment