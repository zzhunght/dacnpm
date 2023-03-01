/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import "./style/global.css";
import Login from "./page/login/Login";
import SignUp from "./page/login/Signup";
import { Route, Switch, useHistory } from "react-router-dom";
// import { Route, Switch, useHistory } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import { useContext, useLayoutEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import Accessory from './components/Employee/Accessory/Accessory';
import {Staff} from './components/Admin/Staff/Staff';
import  Customer  from "./components/Employee/Customer/Customer";
import Statistical from './components/Admin/Statistical/Statistical'
import CarReceipt from "./components/Employee/CarReceipt/CarReceipt";
import Home from "./components/Home/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import Promotion from "./components/Admin/Promotion/Promotion";
import Pay from "./components/Employee/Pay/Pay";
import DetailPay from "./components/Employee/Pay/DetailPay";
import ProtectedRoute from "./routes/ProtectedRoute";
import CarReceiptDetail from "./components/Employee/CarReceipt/CarReceiptDetail";
import PromotionDetail from "./components/Admin/Promotion/PromotionDetail";
function App() {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  let history = useHistory();
  useLayoutEffect(() => {
    if (isAuthenticated === false && isLoading === false) {
      history.push("/login");
    } 
  }, [isAuthenticated, isLoading]);
  return (
    <>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <ProtectedRoute >
          <Sidebar >
          <Route exact path="/">
              <Home />
          </Route>
            
          <Route exact path="/accessory">
              <Accessory />
            </Route>
            
            <Route exact path="/customer">
              <Customer />
            </Route>
            <Route exact path="/staff">
              <Staff />
            </Route>
            <Route exact path="/statistical">
              <Statistical />
            </Route>
            <Route exact path="/carreceipt">
              <CarReceipt />
            </Route>
            <Route exact path="/carreceipt/detail/:id">
              <CarReceiptDetail />
            </Route>
            <Route exact path="/promotion">
              <Promotion />
            </Route>
            <Route exact path="/promotion/detail/:id">
              <PromotionDetail />
            </Route>
            <Route exact path="/pay">
              <Pay />
            </Route>
            <Route exact path="/deatilPay">
              <DetailPay />
            </Route>
          </Sidebar>
        </ProtectedRoute>
        
      </Switch>

    </>
  );
}

export default App;
