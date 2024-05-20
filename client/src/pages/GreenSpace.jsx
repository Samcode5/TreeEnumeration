import React, { useEffect } from "react";
import "../components/About/About.scss"
import { useState } from "react";
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';

const GreenSpace= () => {
    // const [image,setImage]=useState(false)
     const [Loading,setLoading]=useState(true);
     const [imageName,setImageName]=useState('');
     const [green,setGreen]=useState(null)
     const [submit,setSubmit]=useState(false);
//   function convertToBase64(file)
//   {
//      return new Promise((resolve,reject) =>{
//       const fileReader=new FileReader();
//       fileReader.readAsDataURL(file);
//       fileReader.onload=()=>{
//         resolve(fileReader.result)
//       };
//       fileReader.onerror=(error) =>{
//           reject(error)
//       }
//      })
         
//   }


   function handleSubmit(e)
    {
        e.preventDefault();
        setSubmit(true);
        try{
          axios({
            method:'POST',
            url:'http://localhost:5000/upload',
            data:{
              myfile:imageName
            }
          }).then((data) => 
            {
            console.log(data)
            setGreen(data.data[0]); 

            }
        )
        }
        catch(err)
        {
          console.log(err);
        }
       
        // const response= await axios.get("http://localhost:5000/getResult");
        // console.log(response);
        

    }



    async function handleChange(e)
    {
        e.preventDefault()
        const file=e.target.files[0];
        setImageName(file.name);
        // setImage(true);
        // const base64= await convertToBase64(file)
        // setUserData({...userData,myfile:base64})

    }

    return (
        <div>
            <h1>
                placeholder
            </h1>
            <form onSubmit={(e) =>handleSubmit(e)} className="aboutSection">
        <input type="file" accept=".jpeg,.jpg,.png" name="myfile" onChange={handleChange}/>
        <input type='submit' value='Submit' className='button'></input>
      </form>
            <section className='aboutSection'>
                <div className = 'aboutLeft'>
                {/* <div className="header">
                    Tree Count:
                    </div> */}
                {imageName.length==0?<></>:
                    <img 
                        src={`./test_images/${imageName}`} 
                        // className='aboutImage'
                        alt="smoething"
                        width={750} height={450}/>
                }
                   
                </div>
                <div className="aboutRight">
                    {/* <div className="header">
                    hi
                    </div> */}
                    {/* <div className="body">
                     hi
                    </div> */}
                    {/* {green==null?<>{submit?
                            <><CircularProgress/></>:<></>
                        }</>:
                    <img 
                        src="./GreenSpaceResult/result.png"
                        // className='aboutImage'
                        alt="smoething"
                        width={750} height={450}/>
                        
                    } */}
                </div>
            </section>
            <div className="aboutSection">
                <div className="header">
                    {submit && green==null? 
                    <div>Calculating Green Space....</div>
                    :<></>
                    }

                    {
                        green?<>Green Space is {green}%</>:<></>
                    }
                    
                </div> 
            </div>
        </div>
        
    );
};
 
export default GreenSpace;