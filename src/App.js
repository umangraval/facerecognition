import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';

function App() {
  return (
    <div className="App">
     <Navigation />
      <Logo />
     {/* <Imagelink />
      <Facerecognition />*/}
    </div>
  );
}

export default App;
