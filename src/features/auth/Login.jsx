import { useDispatch }      from 'react-redux'
import { setCredentials }   from './authSlice'
import { useLoginMutation } from './authApiSlice'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState} from 'react'

const Login = () => {
    const userRef   = useRef()
    const errRef    = useRef()
    const navigate  = useNavigate()
    const dispatch  = useDispatch()
    const [userName, setUser]   = useState('')
    const [password, setPwd]    = useState('')
    const [errMsg, setErrMsg]   = useState('')
    const [login, { isLoading }] = useLoginMutation()
    const handleUserInput   = (e) => setUser(e.target.value)
    const handlePwdInput    = (e) => setPwd(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const userData = await login({ userName, password }).unwrap()
            dispatch(setCredentials({ ...userData, userName }))
            setUser('')
            setPwd('')
            navigate('/users')
        } catch (err) {
            if (!err?.originalStatus) {
                // isLoading: true until timeout occurs
                setErrMsg('No Server Response')
            } 
            else if (err.originalStatus === 400) setErrMsg('Missing Username or Password')
            else if (err.originalStatus === 401) setErrMsg('Unauthorized')
            else setErrMsg('Login Failed')
            errRef.current.focus();
        }
    }

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [userName, password])

    const content = isLoading ? <h1>Loading...</h1> : (
        <div className="container mt-5" style={{ maxWidth: "500px"}}>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label className="form-label" htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    value={userName}
                    autoComplete="off"
                    className="form-control"
                    onChange={handleUserInput}
                    required
                />
                <label className="form-label mt-3" htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    className="form-control"
                    onChange={handlePwdInput}
                    required
                />
                <div className="row">
                    <div className="col">
                        <Link to="/">
                            <button className='btn btn-sm btn-warning rounded-pill mt-3 px-3'>Cancel</button>
                        </Link>
                    </div>
                    <div className="col d-flex justify-content-end">
                        <button className='btn btn-sm btn-info rounded-pill mt-3 px-3'>Sign In</button>
                    </div>
                </div>
            </form>
        </div>
    )
  return content
}

export default Login
