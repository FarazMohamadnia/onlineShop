import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Create from "./pages/create/create";
import About from "./pages/about/about";
import CardId from "./pages/cartid/cartid";
import CartSelection from "./pages/CartSelection/cartSelection";
import Login from "./pages/Login/login";
import { createContext, useState } from "react";

export const appContext = createContext(null)

function App() {
  const [islogin , setislogin]= useState(false)
  return(
  <appContext.Provider value={{islogin , setislogin}}>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/create" element={<Create />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/Card/:cardid" element={<CardId />}/>
      <Route path="/Cart" element={<CartSelection />}/>
      <Route path="/Login" element={<Login />}/>
    </Routes>
  </appContext.Provider>
  )
}

export default App;
