import React, { useContext } from 'react';

import { ThemeContext } from "../libs/context";
import Navigation from './navigation';

const ThemeToggler = () => {

    const {theme, setTheme} = useContext(ThemeContext);

    const handleThemeToggle = (e) => {
      e.preventDefault();

      setTheme(theme === 'light'? 'dark' : 'light');
    }

    return(
        <button className="themetoggler" onClick={handleThemeToggle}>
            <span role="img" aria-label="switch theme">
              {theme === 'light'? '🌞' : '🔅'}
            </span>
        </button>
    )
}

export default ThemeToggler;


