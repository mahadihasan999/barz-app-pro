import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./components/Home/Home";
import Navbar from "./components/Header/Navbar";
import Navbar2 from "./components/Header/Navbar2";
import DisplayPoems from "./components/DisplayCatalog/DisplayPoems";
import UpdatePoem from "./components/UpdatePoem/UpdatePoem";




function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Navbar2></Navbar2>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/catalog" element={<DisplayPoems />} />
          <Route path="/poems/update/:id" element={<UpdatePoem />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
