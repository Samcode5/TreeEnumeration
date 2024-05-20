import './App.css';
import {useEffect, useState} from "react"
import React from 'react';
import axios from 'axios'
import {
	BrowserRouter as Router,
	Routes,
	Route,
  BrowserRouter,
} from "react-router-dom";
import GreenSpace from './pages/GreenSpace';


function App()
{
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/greenspace" element={<GreenSpace/>}/>
    </Routes>
    </BrowserRouter>
  )
}


export default App;
