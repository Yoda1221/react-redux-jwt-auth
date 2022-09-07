import React          from 'react'
import App            from './App'
import { store }      from './app/store'
import { Provider }   from 'react-redux'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import './sass/style.scss'

createRoot(document.getElementById('root'))
.render(
  <React.StrictMode>
    <Provider store={ store }>
      <Router>
        <Routes>
          <Route path='/*' element={ <App /> } />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
)
