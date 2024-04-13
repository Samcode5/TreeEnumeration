
import './App.css';
import {useState} from "react"
import React from 'react';
import axios from 'axios'
function App()
{
  const [userData,setUserData]=useState({myfile:""})

  function convertToBase64(file)
  {
     return new Promise((resolve,reject) =>{
      const fileReader=new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload=()=>{
        resolve(fileReader.result)
      };
      fileReader.onerror=(error) =>{
          reject(error)
      }
     })
         
  }
  function handleSubmit(e)
  {
      e.preventDefault();
      
        
    try{
      axios({
        method:'POST',
        url:'http://localhost:5000/upload',
        data:{
          myfile:userData.myfile
        }
      })
    }
    catch(err)
    {
      console.log(err);
    }

  }

  async function handleChange(e)
  {
      const file=e.target.files[0];
      const base64= await convertToBase64(file)
      setUserData({...userData,myfile:base64})


  }

  return (
    <div>
      <div>EcoVision</div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".jpeg,.jpg,.png" name="myfile" onChange={handleChange}/>
        <input type='submit' value='Submit' className='button'></input>
      </form>
    </div>
  );
}

export default App;
