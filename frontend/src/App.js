
import './App.css';
import {useEffect, useState} from "react"
import React from 'react';
import axios from 'axios'
function App()
{
  const [userData,setUserData]=useState({myfile:""})
  const [userImage,setUserImage]=useState([])

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

  async function showImage()
    {
  
      // try {
      //   const response = await fetch('http://localhost:5000/getimages');
      //   const data = await response.json();
      //   console.log(response);
      //   setUserImage(data[0].myfile);
      // } catch (error) {
      //   console.log(error);
      // }
      fetch("http://localhost:5000/getimages",{
        method:"GET",
      }).then((res)=> res.json().then((data) =>{
        console.log(data.data.myfile)
        setUserImage(data.data.myfile)
      }))
      // console.log(response.data.data[0].myfile)
      
  
    }

  useEffect(() =>{
    showImage()
  },[])
  

  return (
    <div className='mainContainer'>
      <div>EcoVision</div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".jpeg,.jpg,.png" name="myfile" onChange={handleChange}/>
        <input type='submit' value='Submit' className='button'></input>
      </form>
      {userImage && <img src={userImage} alt='Uploaded' width={600} height={600} />}

    </div>
  );
}

export default App;
