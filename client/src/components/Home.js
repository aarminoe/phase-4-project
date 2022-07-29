import React from "react";
import Posts from "./Posts";


function Home({userList}) {

    return(
        <div>
            <div>
                {userList.map((user) => {
                    return  <Posts user={user} />
                })}
            </div>
        </div>
    )
}

export default Home