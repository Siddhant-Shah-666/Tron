import { React, useEffect, useState, useRef } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

import * as THREE from "three";
import FOG from "vanta/dist/vanta.fog.min";

import Navbar from "./Components/Navbar";
import Header from "./Components/Header";
import AppRoutes from "./AppRoutes";
import { UserProvider, useUser } from "./contextApi/UserContext"; // <-- IMPORT useUser
import { ThemeProvider } from "./contextApi/ThemeContext";

function App() {
  const [showNavbar, setShowNavbar] = useState(false);

  // Vanta.js State and Ref
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  // Vanta.js Effect
  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(
        FOG({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: window.innerHeight,
          minWidth: window.innerWidth,
          highlightColor: 0xf0ff,
          midtoneColor: 0x293339,
          lowlightColor: 0x1b1b39,
          baseColor: 0xb0c0f,
        })
      );
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  
  // --- NEW LOADING COMPONENT ---
  const MainAppContent = () => {
    // 1. Consume the loading state from the context
    const { isLoading } = useUser();
    
    // 2. Conditionally render a loading screen
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen w-screen text-cyan-400 text-3xl font-bold bg-slate-950/90">
                <p>Establishing Secure Connection...</p>
            </div>
        );
    }

    // 3. Render the main content once loading is complete
    return (
        <div className="flex">
            <div className="nav">
                <Navbar
                    visible={showNavbar}
                    closeNavbar={() => setShowNavbar(false)}
                />
            </div>

            <div className="body">
                <div className="header">
                    <Header
                        toggleNavbar={() => setShowNavbar((prev) => !prev)}
                        showNavbar={showNavbar}
                    />
                </div>
                
                <div
                    className="main w-[100vw] md:w-[85vw] md:h-[88vh] h-[90vh] relative md:p-5 overflow-y-auto border border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-400/30 bg-slate-950/70"
                >
                    <div className="relative z-5">
                        <AppRoutes />
                    </div>
                </div>
            </div>
        </div>
    );
  }
  // --- END NEW LOADING COMPONENT ---

  return (
    <>
      <UserProvider>
        <ThemeProvider>
          
          <div ref={vantaRef} className="fixed top-0 left-0 w-full h-full z-[-1]" />

          <MainAppContent /> {/* RENDER THE CONDITIONAL CONTENT */}
          
        </ThemeProvider>
      </UserProvider>
    </>
  );
}

export default App;