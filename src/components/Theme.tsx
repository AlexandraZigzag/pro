import React, { useState } from 'react';
import './Theme.css';

const Theme = () => {
      const [theme, setTheme] = useState('light');
      const switchTheme = () => {
      setTheme((cur) => (cur === 'light' ? 'dark' : 'light'));
    };
      return (
        <div className="wrap" id={theme}>
            <div className="toogle-conteiner">
                <p className="change-text">{theme} mode</p>
                <input onChange={switchTheme} type="checkbox" id="toogle-btn" />
                <label htmlFor="toogle-btn" className="toogle-label"></label>
            </div>
          {/*<div className="conteiner">*/}
          {/*  <div id="sun" className="shape"></div>*/}
          {/*  <div id="moon" className="shape"></div>*/}
          {/*</div>*/}
        </div>
      );
}
export default Theme;
