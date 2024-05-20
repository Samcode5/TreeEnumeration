import React from "react";
import "../components/About/About.scss"
 
const OptimalPath = () => {
    return (
        <div>
            <h1>
                placeholder
            </h1>
            <form className="aboutSection">
                <div className="button">
                    <button>Choose File</button>
                    <span> No File Chosen </span>
                    {/* <input type="file" accept=".jpeg,.jpg,.png" name="myfile"/> */}
                    <button>Submit</button>
                    {/* <input type='submit' value='Submit' className='button'></input> */}
                </div>
            </form>
            <section className='aboutSection'>
                <div className = 'aboutRight'>
                <div className="header">
                    Input Image
                    </div>
                    <img 
                        src='/images/optimalinput.png' 
                        // className='aboutImage'
                        alt="smoething"
                        width={750} height={450}/>
                </div>
                <div className="aboutRight">
                    <div className="header">
                    Processed Image
                    </div>
                    {/* <div className="body">
                     hi
                    </div> */}
                    <img 
                        src='/images/optimalprocessed.png' 
                        // className='aboutImage'
                        alt="smoething"
                        width={750} height={450}/>
                </div>
            </section>
            <div className="aboutSection">
                <div className="aboutLeft">
                    <div className="header">Output Image</div>
                </div>
            </div> 
            <div className="aboutSection">
                
                <img 
                        src='/images/optimaloutput.png' 
                        // className='aboutImage'
                        alt="smoething"
                        width={750} height={450}/>
            </div>
        </div>
        
    );
};
 
export default OptimalPath;