import React from 'react';
import './App.css';
import Table from './components/table';
import ThemeProvider from './themeProvider/theme';

function App() {

  return (
   
    <ThemeProvider>
      <Table/>
    </ThemeProvider>
  )
}

export default App;
