import React from 'react';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import Services from './components/Services';
import WorkProcess from './components/WorkProcess';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Manifesto />
      <Services />
      <WorkProcess />
      <Contact />
      <About />
      <Footer />
    </div>
  );
}





export default App;
