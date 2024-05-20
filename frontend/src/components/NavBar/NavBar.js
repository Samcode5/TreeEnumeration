import './NavBar.scss'
import { useState, useEffect } from 'react'

import { RxHamburgerMenu as OpenMenu } from "react-icons/rx"
import { CgClose as HideMenu} from 'react-icons/cg' 
import { Link } from 'react-router-dom'

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
      window.innerWidth > 1200 && setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <nav className="navBar">
        <div className="leftSection">
        <Link to='/'>
          <a href='/index.html' target={'_blank'} style={{textDecoration: "none", outline: "none"}}>
          
            <div className='companyLogo'>
              <img src='/images/globeIcon.png'/>
                <h1>EcoVision</h1>
            </div>
            
          </a>
          </Link>
            <div className="navBtns">
              <div className="navDropdown">
                <Link to='/'>
                  <button>About Us</button>
                </Link>
                <div className="aboutDropdownMenu">
                  <div className="menuItem">
                    <h3>Who We Are</h3>
                    <hr/>
                    <div className="dropdownDescription">
                      <p>
                        Get to know more about our business and what we do to serve our fellow communities.
                        <span>
                          <a href='#' style={{textDecoration: "none"}}> Learn more.</a>
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="menuItem">
                    <h3>Our Mission</h3>
                    <hr/>
                    <div className="dropdownDescription">
                      <p>
                        Our mission at Company is to make a positive impact in the world through our work.
                        <span>
                          <a href='#' style={{textDecoration: "none"}}> Learn more.</a>
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="menuItem">
                    <h3>Meet the Team</h3>
                    <hr/>
                    <div className="dropdownDescription">
                      <p>
                        See all the amazing members of our team who help make our goals become reality.
                        <span>
                          <a href='#' style={{textDecoration: "none"}}> Learn more.</a>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="navDropdown">
                <button>Services</button>
                <div className="serviceDropdownMenu">
                  <div className="menuItem">
                    <h3>Service #1</h3>
                    <hr/>
                    <div className="dropdownDescription">
                      <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        <span>
                          <a href='#' style={{textDecoration: "none"}}> Learn more.</a>
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="menuItem">
                    <h3>Service #2</h3>
                    <hr/>
                    <div className="dropdownDescription">
                      <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        <span>
                          <a href='#' style={{textDecoration: "none"}}> Learn more.</a>
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="menuItem">
                    <h3>Service #3</h3>
                    <hr/>
                    <div className="dropdownDescription">
                      <p>
                      Lorem ipsum dolor sit amet.
                        <span>
                          <a href='#' style={{textDecoration: "none"}}> Learn more.</a>
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="menuItem">
                    <h3>Service #4</h3>
                    <hr/>
                    <div className="dropdownDescription">
                      <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        <span>
                          <a href='#' style={{textDecoration: "none"}}> Learn more.</a>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <Link to='/treecount'>
                <button>Tree Count</button>
              </Link>
              <Link to='/greenspace'>
                <button>Green Space</button>
              </Link>
              <Link to='/optimalpath'>
                <button>Optimal Path</button>
              </Link>
              <Link to='/historicaldata'>
                <button>Historical Data</button>
              </Link>
            </div>
        </div>
        {/* <div className='rightSection'>
          <div className="accountSection">
            <button>Login</button>
            <button>Sign Up</button>
          </div>
          <div className="menuSection">
            {
              !menuOpen ? 
                <OpenMenu className='menuBtn' onClick={() => setMenuOpen(true)}/> : 
                <HideMenu className='hideBtn' onClick={() => setMenuOpen(false)}/>
            }
          </div>
        </div> */}
        <div className="sideMenu" style={{display: (!menuOpen || width > 1200) ? 'none' : 'flex'}}>
          <div className="sideMenuSiteSections">
            <button>About Us</button>
            <button>Services</button>
            <button>Community</button>
            <button>Blog</button>
            <button>Contact Us</button>
          </div>
          <div className="sideMenuContent">
            <div className="sideMenuAccountHeader">
              <h1>Login or Sign Up</h1>
            </div>
            <div className="loginSignUpSection">
              <div className="sideMenuAccountBtns">
                <button>Login</button>
                <button>Sign Up</button>
              </div>
              <div className='disclaimer'>
                &copy; Company. All rights reserved. All trademarks are property of their respective owners in the US and other countries.
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar
