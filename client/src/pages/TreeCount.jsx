import React from "react";
import "../components/About/About.scss"
import { useState } from "react";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
 
const TreeCount = () => {
    const [Loading,setLoading]=useState(true);
     const [imageName,setImageName]=useState('');
     const [treeCount,setTreeCount]=useState(null)
     const [submit,setSubmit]=useState(false);

     function handleSubmit(e)
     {
         e.preventDefault();
         setSubmit(true);
         try{
           axios({
             method:'POST',
             url:'http://localhost:5000/treecount',
             data:{
               name:imageName
             }
           }).then((data) =>{
            console.log(data);
            setTreeCount(data.data)
           })
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
                    {treeCount==null?<>{submit?
                            <><CircularProgress/></>:<></>
                        }</>:
                    <img 
                        src="./TreeCountImages/result.png"
                        // className='aboutImage'
                        alt="smoething"
                        width={750} height={450}/>
                        
                    }
                </div>
            </section>
            <div className="aboutSection">
                <div className="header">
                    {submit && treeCount==null? 
                    <div>Calculating Tree Count....</div>
                    :<></>
                    }

                    {
                        treeCount?<>Tree Count:{treeCount}</>:<></>
                    }
                    
                </div> 
            </div>
        </div>
        
    );
};
 
export default TreeCount;