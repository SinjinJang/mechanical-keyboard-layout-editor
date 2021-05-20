import './Home.css';

import KeyPlate from '../components/KeyPlate';
import Header from '../components/Header';
import Footer from '../components/Footer';


function Home() {
  return (
    <div className='Home'>
      <Header />
      <KeyPlate />
      <Footer />
    </div>
  );
}

export default Home;
