import Comments from "./Comments";

function Post({post}) {
    return (
        <div>
            Post
            <Comments post={post}/>
        </div>
    )
}

export default Post