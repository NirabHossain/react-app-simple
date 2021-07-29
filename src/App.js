// import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import Shop from './Components/Shop/Shop';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Review from './Components/Review/Review';
import Inventory from './Components/Inventory/Inventory';
import NotFound from './Components/NotFound/NotFound';
import ProductDetail from './Components/ProductDetail/ProductDetail';
import Login from './Components/Login/Login';
import Shipment from './Components/Shipment/Shipment';
import { createContext, useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const userContext = createContext();


function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <userContext.Provider value= {[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header></Header>
        <Switch>
          
        <Route exact path="/">
            <Shop></Shop>
          </Route>
          
          <Route path="/shop">
            <Shop></Shop>
          </Route>

          <Route path='/review'>
            <Review></Review>
          </Route>         

          <PrivateRoute path='/inventory'>
            <Inventory></Inventory>
          </PrivateRoute>        

          <Route path='/login'>
            <Login></Login>
          </Route>        

          <PrivateRoute path='/shipment'>
            <Shipment/>
          </PrivateRoute>

          <Route path='/product/:productKey'>
            <ProductDetail></ProductDetail>
          </Route>
          
          <Route path="*">
            <NotFound></NotFound>
          </Route>
          
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
