import React from 'react';
import './App.css';
import Posts from './components/Posts';
import quill from './images/quill.svg';
function App() {
  return (
    <div className="App">
      <header>
        <div className='img-container'>
          <img src={quill} alt='quill pen'/>
        </div>
       <h1>The Hobbiton Blog</h1>
      </header>
      <Posts />
      <footer>
        <p>Copyright 2020 Heather Nuffer</p>
      </footer>
    </div>
  );
}

export default App;
