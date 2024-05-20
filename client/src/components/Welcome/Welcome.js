import { useEffect, useRef } from 'react'
import './Welcome.scss'

const Welcome = () => {
  const welcomeImageRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting)
          entry.target.classList.add("fadeIn")
      })
    }, {
      threshold: 0.5
    })
    observer.observe(welcomeImageRef.current)
  }, [])

  return (    
    <section className="welcomeSection">
      <div className="welcomeText">
        <div className="motto">
          Your Solution for Accurate Tree Enumeration
        </div>
        <div className="mottoSubtitle">
          EcoVision is an open source service for Tree Enumeration to provide access to visualisations or 
          interactive interfaces that allow users to explore and interpret the results easily.
        </div>
        <div className="welcomeButtons">
          <button>Learn More</button>
          <button>Watch Intro Video</button>
        </div>
      </div>
      <div className="imageSection">
        <img 
          src='/images/welcome.jpg' 
          className='welcomeImage'
          ref={welcomeImageRef} 
          width={576*1.1} height={360*1.1}/>
      </div>
    </section>
  )
}

export default Welcome
