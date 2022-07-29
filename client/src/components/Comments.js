import Comment from "./Comment"

function Comments({post}) {
    return (
        <div>
            {post.comments.map((comment) => {
                return <Comment comment={comment} />
            })}
        </div>
    )
}

export default Comments