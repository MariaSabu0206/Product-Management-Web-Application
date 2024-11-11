import React, { useEffect, useState } from 'react'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import LoginForm from './Login/LoginForm';
import Register from './Login/Register';
import HomePage from './Home/HomePage';
import { createContext } from 'react';
import CreatePage from './CreateForm/CreatePage';
import axios from 'axios';
import Edit_Form from './EditPage/Edit_Form';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

const product_context=createContext();

const App = () => {
  const [product, setProduct] = useState([]);
  const [productdetail, setproductdetail] = useState([])
  const [productid, setproductid] = useState("");
 
  useEffect(() => {
    axios.get('https://dummyjson.com/products').then((response) => {
        setProduct(response.data.products);
        setproductdetail(response.data.products);
    });
}, []);

  return (
    <>
   <product_context.Provider value={{product,setProduct,productdetail,setproductdetail,productid,setproductid}}>
    <BrowserRouter>
    <Routes>
      {/* Redirects the root path to /login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginForm/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/home" element={<HomePage/>} />
      <Route path="/formCreate" element={<CreatePage/>} />
      <Route path="/edit" element={<Edit_Form/>} />

    </Routes>
  </BrowserRouter>
  </product_context.Provider>
  <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick />
  </>
  )
}

export default App
export {product_context}