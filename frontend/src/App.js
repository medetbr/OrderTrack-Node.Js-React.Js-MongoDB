import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import './App.css';
import Login from './Page/Login/Login';
import Order from './Page/Order/Order';
import ShopOrders from './Page/ShopOrders/Order';
import Profil from './Page/Profil/Profil';
import ShopProfil from './Page/ShopProfil/Profil';
import Register from './Page/Register/Register';
import UserInterface from './Page/UserInterface/UserInterface';
import UserOrders from './Page/UserOrders/UserOrders';

function App() {
  const user = useSelector(state => state.users.userInfo)
  return (
     <Router>
        <Routes>
        <Route path="/" exact element={!user ? <Login/> : <UserInterface/>} /> 
        <Route path="/login"  element={!user ? <Login/> : <UserInterface/>} />
        <Route path="/register"  element={!user ? <Register/> : <UserInterface/>} />
        <Route path="/order/:id"  element={user ? (user.customer === true ?  <Order/> :<UserInterface/>): <Login/> } />
        <Route path="/shop/order"  element={user && user.customer === false &&  <ShopOrders/>  } />
        <Route path="/user/order"  element={  <UserOrders/>  } />
        <Route path="/profile/shop"  element={user && user.customer === false &&  <ShopProfil /> } />
        <Route path="/profile"  element={!user ?  <Login/> : <Profil /> } />
        
        </Routes>
      </Router>
  );
}

export default App;
