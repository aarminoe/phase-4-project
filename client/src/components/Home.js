import React from "react";
import Posts from "./Posts";


function Home({userList}) {

    return(
        <div>
            <div>
                {userList ? userList.map((user) => {
                    return  <Posts user={user} />
                }):null}
            </div>
        </div>
    )
}

export default Home