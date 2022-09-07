import { useGetUsersQuery } from "./usersApiSlice"

const UsersList = () => {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery()
    
    let content
    if (isLoading) content = <p>"Loading..."</p>
    else if (isSuccess && Object.keys(users).length !== 0) {
        content = (
            <section className="container mt-5">
                <h1>Users List</h1>
                <ul>
                    {Object.keys(users.users).map((user, i) => (
                        <li key={i}>{ users.users[user].userName }</li>
                    ))}
                </ul>
            </section>
        )
    }
    else if (isError) content = <p>{JSON.stringify(error)}</p>;

    return content
}

export default UsersList
