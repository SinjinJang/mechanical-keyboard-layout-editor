import { HashRouter, Routes, Route } from 'react-router-dom';

import Home from './routes/Home.jsx';
import About from './routes/About.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

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
