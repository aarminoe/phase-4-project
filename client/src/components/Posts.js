import Post from "./Post"

function Posts({user}) {
    return (
        <div>
            {user.posts ? user.posts.map((post) => {
                return <Post post={post} user={user} />
            }):null}
        </div>
    )
}

export default Posts