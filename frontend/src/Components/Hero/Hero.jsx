import React from 'react';
import './Hero.css'; // Assuming you have a separate CSS file

const Hero = () => {
  return (
    <div className="hero">
      <main className="main">
        <section className="section banner banner-section">
          <div className="container banner-column">
            <div className="banner-inner">
              <h1 className="heading-xl">Experience Fastion Like Never Before</h1>
              <p className="paragraph">
                Step into a world where fashion meets elegance. Explore our latest collection, designed to bring out the best in you.       
                <br/>
                <button style={{marginTop:22}} className="btn btn-darken btn-inline">
                Our Products<i className="bx bx-right-arrow-alt"></i>
                </button>
              </p>
              
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Hero;
