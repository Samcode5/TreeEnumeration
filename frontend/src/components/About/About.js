import { useEffect, useRef } from 'react'
import './About.scss'

const About = () => {
  const aboutImageRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting)
          entry.target.classList.add("fadeIn")
      })
    }, {
      threshold: 0.5
    })
    observer.observe(aboutImageRef.current)
  }, [])

  return (
    <section className='aboutSection'>
      <div className="aboutLeft">
        <img 
          src='/images/aboutUsImage.png' 
          className='aboutImage'
          ref={aboutImageRef} 
          width={750} height={450}/>
      </div>
      <div className="aboutRight">
        <div className="header">
          About Us
        </div>
        <div className="body">
          We are Final Year students from Vishwakarma Institute of Technology, from Computer Department.
          This is our Major Project and our team, consisting of Rugvedi Ghule, Sameer Mudawadkar, and Yash Shejwal, 
          have done this project under the guidance of Prof. Archana Burujwale.
        </div>
        <div className="button">
          <button>Read More</button>
        </div>
      </div>
    </section>
  )
}

export default About
