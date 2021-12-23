import './App.css';
import { Routes, Route } from "react-router-dom";
import { homePath, tablePath } from '../constants';
import TableComponent from './components/TableComponent';
import HomeComponent from './components/HomeComponent';
import Layout from './layout';
import { StyledEngineProvider } from '@mui/material/styles';

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
    <Layout>
      <Routes>
        <Route path={tablePath} element={<TableComponent /> } >
        </Route>
        <Route path={homePath} element={<HomeComponent />}>
        </Route>
      </Routes>
    </Layout>
    </StyledEngineProvider>
  );
}

export default App;
