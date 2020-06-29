import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path='/'>
          </Route>
          <Route path='/saved'>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
