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
import DefaultLayout from "./components/Layout/DefaultLayout";
import { Customer } from "./components/Employee/Customer/Customer";
import Statistical from './components/Admin/Statistical/Statistical'
import CarReceipt from "./components/Employee/CarReceipt/CarReceipt";
import AddStaff from "./components/Admin/Staff/AddStaff";
import AddCustomer from "./components/Employee/Customer/AddCustomer";
import AddAccessory from "./components/Employee/Accessory/AddAccessory";
import AddCarReceipt from "./components/Employee/CarReceipt/AddCarReceipt";
import DetailCarReceipt from "./components/Employee/CarReceipt/DetailCarReceipt";
import Home from "./components/Home/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import Promotion from "./components/Admin/Promotion/Promotion";
import AddPromotion from "./components/Admin/Promotion/AddPromotion";
import Pay from "./components/Employee/Pay/Pay";
import DetailPay from "./components/Employee/Pay/DetailPay";
function App() {
  const { isAuthenticated } = useContext(AuthContext);

  let history = useHistory();
  useLayoutEffect(() => {
    if (!isAuthenticated) {
      history.push("/login");
    } else {
      history.push("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      {isAuthenticated ? (
        <>
          {/* <div className="flex"> */}
            {/* <div className="content"> */}
          <Sidebar >
              <Switch>
              <Route exact path="/">
                  <Home />
                </Route>
                
              <Route exact path="/accessory">
                  <Accessory />
                </Route>
                
                <Route path="/customer">
                  <Customer />
                </Route>
                <Route path="/staff">
                  <Staff />
                </Route>
                <Route path="/statistical">
                  <Statistical />
                </Route>
                <Route path="/carreceipt">
                  <CarReceipt />
                </Route>
                <Route path="/addStaff">
                  <AddStaff />
                </Route>
                <Route path="/addCustomer">
                  <AddCustomer />
                </Route>
                
                <Route path="/addAccessory">
                  <AddAccessory />
                </Route>
                <Route path="/addCarReceipt">
                  <AddCarReceipt />
                </Route>
                <Route path="/deatilCarReceipt">
                  <DetailCarReceipt />
                </Route>
                <Route path="/promotion">
                  <Promotion />
                </Route>
                <Route path="/addPromotion">
                  <AddPromotion />
                </Route>
                <Route path="/pay">
                  <Pay />
                </Route>
                <Route path="/deatilPay">
                  <DetailPay />
                </Route>
              </Switch>
            </Sidebar>
            {/* </div> */}
          {/* </div> */}
          {/* {publicRoutes.map((rote, index) => {
            const Page = rote.component
            const Layout = rote.layout || DefaultLayout
            return <Route key={index} path={rote.path} element ={<Layout><Page/></Layout>}/>
          })} */}
        </>
      ) : (
        <>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
        </>
      )}
    </>
  );
}

export default App;
