import {Switch, Route} from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import UploadFileRoute from './components/UploadFileRoute'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/posts/add" component={UploadFileRoute} />
    <Route component={NotFound} />
  </Switch>
)

export default App
