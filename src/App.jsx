import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "./style.css"
import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/js/all.min.js"
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
import ApplicationForm from "./ApplicationForm"
import AdminLogin from "./AdminLogin"
import AdminDashboard from "./AdminDashboard"
import akkuyuFoto from "./images/akkuyuFoto.jpg";
import initializeAppData from './AppBootstrap';

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

// Protected route component for admin pages
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true";
  
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }
  
  return children;
};

// Component to hide Navbar and Footer for admin routes
const NavbarFooterWrapper = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  return (
    <>
      {!isAdminRoute && <Navbar rusevi={rusevi} turkiyePng={turkiyePng} />}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
};

// Animated routes component
const AnimatedRoutes = () => {
  const location = useLocation();
  
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
        <Route path="/apply" element={
          <AnimatedPage>
            <ApplicationForm />
          </AnimatedPage>
        } />
        <Route path="/sotnicenko" element={
          <AnimatedPage>
            <Sotnicenko />
          </AnimatedPage>
        } />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Uygulama verilerini başlat
    initializeAppData();
    
    // Yükleme ekranını simüle et
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
      <NavbarFooterWrapper>
        <AnimatedRoutes/>
      </NavbarFooterWrapper>
    </Router>
  )
}

export default App