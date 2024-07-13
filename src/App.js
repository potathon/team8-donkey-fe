import logo from './logo.svg';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Layout from './components/layout/Layout';
import InterestModal from './components/modal/InterestModal';
import { useModal } from './components/modal/useModal';
import Signin from './routes/user/Signin';
import Regist from './routes/user/Regist';
import Main from './routes/post/Main';
import Ranking from './routes/poke/Poke';
import Protagonist from './routes/protagonist/Protagonist';
import Detail from './routes/post/Detail';
import Map from './routes/map/Map';
import ProtectedRoute from './components/ProtectedRoute';
import useAxios from "./hooks/useAxios";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data, loading, error } = useAxios('http://localhost:8090/hello-world', { withCredentials: true });
  useEffect(() => {
    if (data && data.status === 200) {
      setIsAuthenticated(true);
    } else if (error) {
      setIsAuthenticated(false);
    }
  }, [data,error]);
  // useEffect(() => {
  //
  //   const checkAuth = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:8080', { withCredentials: true });
  //       setIsAuthenticated(response.status === 200);
  //     } catch (error) {
  //       setIsAuthenticated(false);
  //     }
  //   };
  //
  //   checkAuth();
  // }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Signin />} />
            <Route path='/regist' element={<Regist />} />
            {/* <Route
              path="/"
              element={<ProtectedRoute isAuthenticated={isAuthenticated}><Main /></ProtectedRoute>}
            /> */}
            <Route path="/posts" element={<Main />} />
            <Route path="/poke" element={<Ranking/>} />
            <Route path="/protagonist" element={<Protagonist />} />
            <Route path="/posts/1" element={<Detail />} />
            <Route path="/map" element={<Map />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
