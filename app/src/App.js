import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import Cart from "./pages/Cart";
import Create from "./pages/Create";
import Employees from "./pages/Employees";
import Home from "./pages/Home";
import Info from "./pages/Info";
import Login from "./pages/Login";
import Order from "./pages/Order";
import Staffhome from "./pages/Staffhome";
import "./style.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/create" element={<Create/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/staffhome" element={<Staffhome/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/order" element={<Order/>}/>
          <Route path="/employees" element={<Employees/>}/>
          <Route path="/info" element={<Info/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
