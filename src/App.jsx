import { Home, Layout, Users } from './components'
import { Routes, Route} from 'react-router-dom'
import Login            from './features/auth/Login'
import Welcome          from './features/auth/Welcome'
import RequireAuth      from './features/auth/RequireAuth'

function App() {
  return (
    <Routes>
      <Route path='/' element={ <Layout />} >
        {/* PUBLIC ROUTES */}
        <Route index element={ <Home />} />
        <Route path='login' element={ <Login />} />

        {/* PROTECTED ROUTES */}
        <Route element={ <RequireAuth />}>
          <Route path='welcome' element={ <Welcome />} />
          <Route path='users' element={ <Users />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
