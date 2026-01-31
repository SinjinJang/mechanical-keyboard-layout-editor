import './Footer.css';
import React from 'react';

function Footer() {
  return (
    <footer className='footer'>
      <div className='footer__item'>
        Copyright©2021 Sinjin Jang<br />All rights reserved.
      </div>
      <div className='footer__item'>
        Get source code of this app:<br />
        <a href='https://github.com/SinjinJang/mechanical-keyboard-layout-editor' target='_blank'>mechanical-keyboard-layout-editor on GitHub</a>
      </div>
      <div className='footer__item'>
        <a href='https://www.buymeacoffee.com/sinjin0' target='_blank'>Buy Me a Coffee</a>
      </div>
    </footer>
  );
}

export default Footer;
