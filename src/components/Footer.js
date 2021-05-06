import './Footer.css';
import React from 'react';

function Footer() {
  return (
    <div className='footer'>
      <div className='footer__item'>
        Copyright©2021 Sinjin Jang<br />All rights reserved.
      </div>
      <div className='footer__item'>
        Get source code of this app:<br />
        <a href='https://github.com/SinjinJang/mechanical-keyboard-layout-editor' target='_blank'>mechanical-keyboard-layout-editor on GitHub</a>
      </div>
      <div className='footer__item'>
        <a href='https://donaricano.com/mypage/1722367584_zHWZl2' target='_blank'>도네리카노 커피 후원</a>
      </div>
    </div>
  );
}

export default Footer;
