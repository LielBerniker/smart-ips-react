import React from 'react';
import TableContainer from './components/TableContainer';
import './App.css';

function App() {
  return (
    <div className="App" onLoad={showContext}>
      <TableContainer />
    </div>
  );
}

export default App;
