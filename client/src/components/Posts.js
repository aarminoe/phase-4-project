import Post from "./Post"

function Posts({user}) {
    return (
        <div>
            {user.posts.map((post) => {
                return <Post post={post} />
            })}
        </div>
    )
}

export default Posts