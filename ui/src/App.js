import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Login />}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App;