import React,{useContext} from 'react';

import { ThemeContext } from "../libs/context";

const Header = () => {
    const {theme} = useContext(ThemeContext);
    return(
        <header className="header">
            <span>Isn't this {theme} Awesome ?</span>
        </header>
    )
}

export default Header;