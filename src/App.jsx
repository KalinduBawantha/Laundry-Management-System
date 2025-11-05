import { BrowserRouter,Routes,Route} from "react-router-dom";
//import Sidebar from "../components/Sidebar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Mainpage from "./pages/Mainpage";
import Dashboard from "./pages/Dashboard";
import ItemRegistration from "./pages/ItemRegistration";
import Order from "./pages/Order";
import OrderDelivery from "./pages/OrderDelivery";
import ItemPriceRegistration from "./pages/ItemPriceRegistration";
//import ManageItems from "./pages/ManageItems";


function App() {
  
  return (
    <BrowserRouter>
    <Routes>
        <Route element={<Home/>} path="/"/>
          <Route element={<Dashboard/>} path="/Dashboard"/>
        <Route element={<Mainpage/>} path="/Mainpage"/>
        <Route element={<Register/>} path="/Register"/>
        <Route element={<ItemRegistration/>} path="/ItemRegistration"/>
        <Route element={<Order/>} path="/Order"/>
        <Route element={<OrderDelivery/>} path="/OrderDelivery"/>
        <Route element={<ItemPriceRegistration/>} path="/ItemPriceRegistration"/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
