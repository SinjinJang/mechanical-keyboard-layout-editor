import { HashRouter, Route } from 'react-router-dom';

import Home from './routes/Home';
import About from './routes/About';

const App = () => (
  <HashRouter>
    <Route exact path='/' component={Home} />
    <Route path='/about' component={About} />
  </HashRouter>
);

export default App;
