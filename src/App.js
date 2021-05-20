import { HashRouter, Route } from 'react-router-dom';

import Home from './routes/Home';
import About from './routes/About';
import Header from './components/Header';
import Footer from './components/Footer';
import Navigation from './components/Navigation';

const App = () => (
  <div className='App'>
    <Header />
    <HashRouter>
      <Navigation />
      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
    </HashRouter>
    <Footer />
  </div>
);

export default App;
