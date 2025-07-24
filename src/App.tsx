import React from 'react';
import logo from './logo.svg';
// import { Routes, Route } from "react-roouter-dom";
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './Components/MainPage';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div>
      {/* <Routes>
        <Route path="/" element={<MainPage/>} /> 
      </Routes> */}
      <MainPage/>
    </div>
  );
}

export default App;
