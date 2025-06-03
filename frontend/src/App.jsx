import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// Your existing imports
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "./style.css"
import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/js/all.min.js"
// import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/js/all.min.js" yedek cdn
import MainPage from './MainPage'
import Navbar from './Navbar'
import Login from './Login'
import turkiyePng from './images/turkey.png';
import rusevi from './images/rusevi.png';
import LoadingPage from './LoadingPage'
import Contact from './Contact'
import Footer from './Footer'
import KurumlarYazi from './KurumlarYazi'
import KurumlarYaziBaskon from './KurumlarYaziBaskon'
import Sotnicenko from './Sotnicenko'
import KurumlarYaziAkkuyu from './KurumlarYaziAkkuyu'
import TurkeyMap from './TurkeyMap'
import Credit from "./Credit"
import akkuyuFoto from "./images/akkuyuFoto.jpg";
import Makale from './Makale'
import RusyaBurslari from './RusyaBurslari'
import KayitOl from './KayitOl'
import Konsolosluklar from './Konsolosluklar'
import ChatBotRusevi from './ChatBotRusevi'
import Admin from './Admin/Admin'
import Rostec from './KurumRos'
import Rosatom from './Rosatom'
import IsStaj from './IsStaj'
import Gazprom from './Gazprom'
import Rusmer from './Rusmer'
import Sputnik from './Sputnik'
import Rusen from './Rusen'


// Animated page wrapper component
const AnimatedPage = ({ children }) => {
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  );
};

// Animated routes component
const AnimatedRoutes = () => {
  const location = useLocation();
  
  // Her route değiştiğinde sayfayı en üste kaydır
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <AnimatedPage>
            <MainPage />
          </AnimatedPage>
        } />
        <Route path="/login" element={
          <AnimatedPage>
            <Login />
          </AnimatedPage>
        } />
        <Route path="/contact" element={
          <AnimatedPage>
            <Contact />
          </AnimatedPage>
        } />
        <Route path="/rusevi" element={
          <AnimatedPage>
            <KurumlarYazi />
          </AnimatedPage>
        } />
        <Route path="/konsolosluk" element={
          <AnimatedPage>
            <KurumlarYaziBaskon />
          </AnimatedPage>
        } />
        <Route path="/akkuyu" element={
          <AnimatedPage>
            <KurumlarYaziAkkuyu akkuyuFoto={akkuyuFoto}/>
          </AnimatedPage>
        } />
        <Route path="/harita" element={
          <AnimatedPage>
            <TurkeyMap />
          </AnimatedPage>
        } />
        <Route path="/credit" element={
          <AnimatedPage>
            <Credit />
          </AnimatedPage>
        } />
        <Route path="/makale" element={
          <AnimatedPage>
            <Makale />
          </AnimatedPage>
        } />
        <Route path="/rusyaburslari" element={
          <AnimatedPage>
            <RusyaBurslari />
          </AnimatedPage>
        } />
         <Route path="/KayıtOl" element={
          <AnimatedPage>
            <KayitOl />
          </AnimatedPage>
        } />
         <Route path="/konsolosluklar" element={
          <AnimatedPage>
            <Konsolosluklar />
          </AnimatedPage>
        } />
        <Route path="/Admin" element={
          <AnimatedPage>
            <Admin />
          </AnimatedPage>
        } />
        <Route path="/IsStaj" element={
          <AnimatedPage>
            <IsStaj />
          </AnimatedPage>
        } />
        <Route path="/Rostec" element={
          <AnimatedPage>
            <Rostec />
          </AnimatedPage>
        } />
        <Route path="/Rosatom" element={
          <AnimatedPage>
            <Rosatom />
          </AnimatedPage>
        } />
         <Route path="/Gazprom" element={
          <AnimatedPage>
            <Gazprom />
          </AnimatedPage>
        } />
         <Route path="/rusmer" element={
          <AnimatedPage>
            <Rusmer />
          </AnimatedPage>
        } />
         <Route path="/rusen" element={
          <AnimatedPage>
            <Rusen />
          </AnimatedPage>
        } />
         <Route path="/sputnik" element={
          <AnimatedPage>
            <Sputnik />
          </AnimatedPage>
        } />
        <Route path="/sotnicenko" element={
  <AnimatedPage>
    <Sotnicenko />
  </AnimatedPage>
} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 0);
    // saniye 3000 olacak

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingPage rusevi={rusevi} />
  }

  return (
    <Router>
      <Navbar rusevi={rusevi} turkiyePng={turkiyePng} />
      <AnimatedRoutes/>
      <ChatBotRusevi/>
      <Footer/>
    </Router>
  )
}

export default App