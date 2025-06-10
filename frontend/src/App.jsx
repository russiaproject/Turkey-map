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
import Yayinlar from './Yayinlar'
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
import turkiyeRusyaBayrak from "./images/turkiye-rusya-bayrak.jpg"
import Dostluk from './Dostluk'
import Evize from './Evize'
import Rt from "./Rt"
import Sberbank from './Sberbank'
import Tass from "./Tass"
import Vize from './Vize'
import RusIzleri from './Rusizleri'
import RusIziEkle from './RusIziEkle'
import MezuniyetKulubu from './Mezuniyet'
import MezuniyetUye from './MezuniyetUye'

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
        <Route path="/Yayinlar" element={
          <AnimatedPage>
            <Yayinlar />
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
         <Route path="/turkiye-rusya-dostlugu" element={
          <AnimatedPage>
            <Dostluk />
          </AnimatedPage>
        } />
         <Route path="/e-vize" element={
          <AnimatedPage>
            <Evize />
          </AnimatedPage>
        } />
        <Route path="/RT" element={
          <AnimatedPage>
            <Rt />
          </AnimatedPage>
        } />
         <Route path="/SberBank" element={
          <AnimatedPage>
            <Sberbank />
          </AnimatedPage>
        } />
         <Route path="/Tass" element={
          <AnimatedPage>
            <Tass />
          </AnimatedPage>
        } />
           <Route path="/vize" element={
          <AnimatedPage>
            <Vize />
          </AnimatedPage>
        } />
         <Route path="/Rus-izi-ekle" element={
          <AnimatedPage>
            <RusIziEkle />
          </AnimatedPage>
        } />
        <Route path="/Mezuniyet" element={
          <AnimatedPage>
            <MezuniyetKulubu />
          </AnimatedPage>
        } />
         <Route path="/Mezuniyet-kayit" element={
          <AnimatedPage>
            <MezuniyetUye />
          </AnimatedPage>
        } />
        <Route path="/turkiyede-rus-izleri" element={
          <AnimatedPage>
            <RusIzleri />
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
      <Navbar rusevi={rusevi} turkiyeRusyaBayrak={turkiyeRusyaBayrak} />
      <AnimatedRoutes/>
      <ChatBotRusevi/>
      <Footer/>
    </Router>
  )
}

export default App