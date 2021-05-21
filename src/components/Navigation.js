import './Navigation.css';

import { Link } from 'react-router-dom';

const Navigation = () => (
  <div className='nav'>
    <Link to='/'>Home</Link>
    <Link to='/about'>About</Link>
  </div>
);

export default Navigation;
