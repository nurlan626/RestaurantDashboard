import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AllOrders from "./components/AllOrders/AllOrders";
import MainPage from "./components/MainPage/MainPage";
import Navbar from "./components/navbar/Navbar";
import MenuDishes from "./components/NewOrder/MenuDishes";
import NewOrder from "./components/NewOrder/NewOrder";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="allorders" element={<AllOrders />} />
          <Route path="/neworders" element={<NewOrder />} />
          <Route path="/menuDishes" element={<MenuDishes />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
