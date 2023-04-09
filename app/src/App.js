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
import Manhome from "./pages/Manhome";
import Workhome from "./pages/Workhome";
import Emphome from "./pages/Emphome";
import "./style.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/create" element={<Create/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/manhome" element={<Manhome/>}/>
          <Route path="/workhome" element={<Workhome/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/employees" element={<Employees/>}/>
          <Route path="/info" element={<Info/>}/>
          <Route path="/emphome" element={<Emphome/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
