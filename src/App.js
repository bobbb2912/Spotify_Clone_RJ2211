import React, {useEffect} from 'react';
import './App.css';
import { Login } from './components/Login';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from './features/login/loginSlice';
import Spotify from './components/Spotify';
import Home from './components/Home';
import Search from './components/Search';

function App() {
  const loginReducer = useSelector((state) => state.loginReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    const hash = window.location.hash;
    if(hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      console.log(token);
      console.log('dispatch', dispatch(getToken(token)));
      dispatch(getToken(token));
    }
  }, [loginReducer.token, dispatch]);
  return (
    <div >
      {loginReducer.token ? <Spotify/> : <Login/>}
     {/* <Search/> */}
    </div>
  );
}

export default App;
