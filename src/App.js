import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './Login';
import Register from './Register';
import AddProducts from './AddProducts';
import UpdateProducts from './UpdateProducts';
import Protected from './Protected';
import ProductList from './ProductList';
import React from 'react';
import SearchProducts from './SearchProducts';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<Protected />}>
            <Route exact path="/" element={<ProductList />} />
            <Route path="/add" element={<AddProducts />} />
            <Route path="/update/:id" element={<UpdateProducts />} />
            <Route path="/search" element={<SearchProducts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
