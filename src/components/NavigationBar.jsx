import { useSelector }  from "react-redux"
import { selectCurrentUser/* , selectCurrentToken */ } from "../features/auth/authSlice"

const NavigationBar = () => {
  const userName  = useSelector(selectCurrentUser)
  /* const token     = useSelector(selectCurrentToken) */
  const welcome   = userName ? `Welcome ${userName}!` : 'Welcome!'
  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid container">
          <a className="navbar-brand" href="/">React Redux Jwt Auth</a>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent" 
          >
          <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/users">Users</a>
                </li>
            </ul>
            <span className="navbar-text">{welcome}</span>
            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" href="login">Login</a>
                </li>
            </ul>
          </div>
      </div>
    </nav>
  )
}

export default NavigationBar
