import { useSelector }  from "react-redux"
import { Link }         from "react-router-dom"
import { selectCurrentUser, selectCurrentToken } from "./authSlice"

const Welcome = () => {
    const userName  = useSelector(selectCurrentUser)
    const token     = useSelector(selectCurrentToken)
    const welcome   = userName ? `Welcome ${userName}!` : 'Welcome!'
    const tokenAbbr = `${token.slice(0, 11)}...`

    return (
        <section className="container mt-5">
            <h1>{welcome}</h1>
            <p>Token: {tokenAbbr}</p>
            <p><Link to="/">Go to the Users List</Link></p>
        </section>
    )
}

export default Welcome
