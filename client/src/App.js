import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Navbar from './components/Navbar'
import Header from './components/Header'
import Home from './pages/Home'
import Saved from './pages/Saved'
import '../src/styles/app.css';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        {/* <Header /> */}
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/saved'>
            <Saved />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
