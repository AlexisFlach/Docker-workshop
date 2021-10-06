import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import {Layout} from './components/Layout'

import Home from './pages/Home'
import About from './pages/About'



const App = () => {

  return (
    <Layout>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
      </Switch>
    </Router>
      
    </Layout>
  )
}

export default App
