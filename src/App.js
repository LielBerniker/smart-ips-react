import React, { useEffect } from 'react';
import TableContainer from './components/TableContainer';
import './App.css';
import { showContext } from './updateSmartDpiConf';

function App() {
  useEffect(() => {
    showContext();
  }, []);

  return (
    <div className="App">
      <TableContainer />
    </div>
  );
}

export default App;