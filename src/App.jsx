import { HashRouter, Routes, Route } from 'react-router-dom';

import Home from './routes/Home';
import About from './routes/About';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => (
  <>
    <Header />
    <HashRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </HashRouter>
    <Footer />
  </>
);

export default App;
