/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import './style/global.css';
import Login from './page/login/Login';
import SignUp from './page/login/Signup';

import {Route, Switch, useHistory} from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar';
import { useContext, useLayoutEffect} from 'react';
import { AuthContext } from './context/AuthContext';
import Product from './page/home/Product/Product';
import Calendar from './page/home/Calendar/Calendar';


function App() {
  const {isAuthenticated} = useContext(AuthContext)

  let history = useHistory();
  useLayoutEffect(() => {
    if (!isAuthenticated){
      history.push('/login');
    }
    else {
      history.push('/home');
    }
  }, [isAuthenticated])
  
  return (
    
    <>
      {isAuthenticated ? (
        <div className='flex'>
          <Sidebar />  
          <div className='content'>
            <Switch>
              <Route exact path='/product'>
                <Product />
              </Route>
              <Route exact path='/calendar'>
                <Calendar />
              </Route>
            </Switch>
          </div>
        </div>
      ) : (
        <>
          <Route exact path='/login'>
            <Login/>
          </Route>
          <Route exact path='/signup'>
            <SignUp/>
          </Route>
        </>
      )}
    </>
  )
}

export default App;
