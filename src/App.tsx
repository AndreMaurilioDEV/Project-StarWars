import './App.css';
import ThemeProvider from './themeProvider/theme';
import { Routes, Route } from 'react-router-dom';
import InitialPage from './components/initial';
import Table from './components/table';
import Layout from './components/Layout';
import PlanetDetails from './components/planetDetails';

function App() {
  return (
    <ThemeProvider>
    <Routes>
      <Route element={<Layout/>}>
      <Route path='/planets' element={<Table/>}/>
      <Route path='/planets/:name' element={<PlanetDetails/>}/>
      </Route>
      <Route path='/' element={<InitialPage/>}/>
    </Routes>
    </ThemeProvider>
  );
}

export default App;
