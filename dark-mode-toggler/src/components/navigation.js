import React from 'react';

import ThemeToggler from './themeToggler'

const Navigation = () => {
    return(
        <nav className="nav">
            <div>
                <span>Home</span>
                <span>About</span>
                <span>Projects</span>
            </div>
            <div>
               <ThemeToggler/>
            </div>
        </nav>
    )
}

export default Navigation;