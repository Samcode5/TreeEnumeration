import {useEffect, useState} from "react"
import React from 'react';
import axios from 'axios'
function GreenSpace()
{
  const [userData,setUserData]=useState({myfile:""})
  const [greenSpace,setGreenSpace]=useState(null);
  const [imageName,setImageName]=useState('');

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
      
         console.log("submiited");
    try{
      axios({
        method:'POST',
        url:'http://localhost:5000/upload',
        data:{
          myfile:userData.myfile
        }
      }).then(async (data) => {
        console.log(data)
        setGreenSpace(data);
    
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
      setImageName(file.name);
      const base64= await convertToBase64(file)
      setUserData({...userData,myfile:base64})


  }

  
useEffect(()=>{
    console.log(greenSpace);
},[greenSpace])

  return (
    <div className='mainContainer'>
      <div>EcoVision</div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".jpeg,.jpg,.png" name="myfile" onChange={handleChange}/>
        <input type='submit' value='Submit' className='button'></input>
      </form>
      {
        imageName?
      <img src={`./test_images/${imageName}`} alt="userImage" width={750} height={450}/>:
      <></>
      }
        <div>
        Green space is {greenSpace}
        </div>
    
    

    </div>
  );
}

export default GreenSpace;
