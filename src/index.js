import React from 'react';
import ReactDOM from 'react-dom/client';
import { Grocery } from './GroceryCalc';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Grocery />
  </BrowserRouter>
);
