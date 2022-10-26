import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Battle from './views/Battle';
import Home from './views/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/battle">
          <Battle />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
