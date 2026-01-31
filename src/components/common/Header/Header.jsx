import './Header.css';

import AboutDialog from '../../dialogs/AboutDialog';

const Header = () => (
  <header>
    <p className='app_name'>Mechanical Keyboard Layout Editor</p>
    <AboutDialog />
  </header>
);

export default Header;
