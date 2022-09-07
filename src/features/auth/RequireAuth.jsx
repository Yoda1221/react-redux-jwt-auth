import { useSelector }          from "react-redux"
import { selectCurrentToken }   from "./authSlice"
import { useLocation, Navigate, Outlet } from "react-router-dom"

const RequireAuth = () => {
    const location  = useLocation()
    const token     = useSelector(selectCurrentToken)

    return (
        token
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth
