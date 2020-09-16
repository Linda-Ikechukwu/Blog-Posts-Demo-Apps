import React,{useState} from 'react';

import './App.css';

import HomePage from './pages/home'

import { ThemeContext } from "./libs/context";


const App = () => {

  const [theme, setTheme] = useState('light');

  return(
    <ThemeContext.Provider value={{theme,setTheme}}>
      <div className="App" data-theme={theme}>
         <HomePage/>
      </div>
    </ThemeContext.Provider>

  )
}

export default App;
