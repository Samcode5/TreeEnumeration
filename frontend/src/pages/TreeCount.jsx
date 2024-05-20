import React from "react";
import "../components/About/About.scss"
 
const TreeCount = () => {
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
                <div className = 'aboutLeft'>
                {/* <div className="header">
                    Tree Count:
                    </div> */}
                    <img 
                        src='/images/treecountinput.png' 
                        // className='aboutImage'
                        alt="smoething"
                        width={750} height={450}/>
                </div>
                <div className="aboutRight">
                    {/* <div className="header">
                    hi
                    </div> */}
                    {/* <div className="body">
                     hi
                    </div> */}
                    <img 
                        src='/images/treecountoutput.png' 
                        // className='aboutImage'
                        alt="smoething"
                        width={750} height={450}/>
                </div>
            </section>

            <div className="aboutSection">
                <div className="header">
                    Tree Count: 78
                </div> 
            </div>
        </div>
        
    );
};
 
export default TreeCount;