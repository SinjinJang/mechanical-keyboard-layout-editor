import './Header.css';

import AboutDialog from '../../dialogs/AboutDialog';
import AnnouncementBanner from '../AnnouncementBanner';

const Header = () => (
  <header>
    <p className='app_name'>Mechanical Keyboard Layout Editor</p>
    <div className="header-actions">
      <AnnouncementBanner />
      <AboutDialog />
    </div>
  </header>
);

export default Header;
