import Comment from "./Comment"

function Comments({post, user}) {
    return (
        <div className="comments-card">
            {post.comments ? post.comments.map((comment) => {
                return <Comment comment={comment} user={user} />
            }):null}
        </div>
    )
}

export default Comments