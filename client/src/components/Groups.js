import Group from "./Group"

function Groups({groupList, loggedInUser}) {
    console.log(groupList)
    return( 
        <div>
            {groupList.map((group) => {
                return <Group group={group} loggedInUser={loggedInUser}/>
            })}
        </div>
    )
}

export default Groups