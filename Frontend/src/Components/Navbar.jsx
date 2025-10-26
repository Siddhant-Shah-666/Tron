import { React, useEffect, useState } from "react";
import {motion} from 'motion/react'

// 1. Import useLocation to detect the current page
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../contextApi/UserContext";
import { useTheme } from "../contextApi/ThemeContext";

function Navbar({ visible, closeNavbar }) {
  const { user, isloggedin } = useUser();
  const { toggleDark, darkMode } = useTheme();
  const companyid = user?.companyId;


  

  // 2. Get the current location object to find the pathname
  const location = useLocation();

  // Helper string for common link styles to avoid repetition
  const linkStyles = "px-3 py-1 rounded-md transition-colors duration-200";

  return (
    <div className={`h-[100vh] w-[100vw] md:w-[15vw] ${visible ? "flex" : "hidden"} md:flex p-0 md:p-10 flex flex-col justify-center items-center md:items-start backdrop-blur-md bg-slate-600/10 md:bg-slate-950/90 md:backdrop-blur-md text-white fixed md:relative z-11 md:z-13`}>
      
      <motion.h1
        className="text-[8vw] md:text-[3vw] mb-6 h-[6vh] w-[25vw] md:h-[7vh] md:w-[10vw] rounded-lg text-white flex justify-center items-center absolute top-5 md:top-3 border bg-slate-800 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-400/30"
        initial={{ boxShadow: "0 0 4px rgba(0, 255, 255, 0.3)" }} 
        animate={{ boxShadow: "0 0 5px rgba(0, 255, 255, 0.8), 0 0 6px rgba(0, 255, 255, 0.4)" }} 
        transition={{
          repeat: Infinity,
          repeatType: "reverse", 
          duration: 2, 
          ease: "easeInOut", 
        }}
      >
        TRON
      </motion.h1>
      
      <ul className="text-[5vw] md:text-[1.8vw] font-bold flex flex-col justify-center items-start gap-y-4 ">
        <li>
          {/* 3. Add classes for styling, hover, and conditional active state */}
          <Link to="/dashboard" onClick={closeNavbar} className={`${linkStyles} ${location.pathname === '/dashboard' ? 'bg-cyan-400 text-slate-900 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-400/30' : 'hover:bg-cyan-400/50'}`}>Dashboard</Link>
        </li>
        {companyid && (
          <li>
            <Link to={`/mytasks/${companyid}`} onClick={closeNavbar} className={`${linkStyles} ${location.pathname === `/mytasks/${companyid}` ? 'bg-cyan-400 text-slate-900 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-400/30' : 'hover:bg-cyan-400/50'}`}>My Tasks</Link>
          </li>
        )}
        <li>
          <Link to="/projects" onClick={closeNavbar} className={`${linkStyles} ${location.pathname === '/projects' ? 'bg-cyan-400 text-slate-900 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-400/30' : 'hover:bg-cyan-400/50'}`}>Projects</Link>
        </li>

        {companyid && (
          <li>
            <Link to={`/alltickets/${companyid}`} onClick={closeNavbar} className={`${linkStyles} ${location.pathname === `/alltickets/${companyid}` ? 'bg-cyan-400 text-slate-900 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-400/30' : 'hover:bg-cyan-400/50'}`}>Tickets</Link>
          </li>
        )}
        <li>
          <Link to="/company" onClick={closeNavbar} className={`${linkStyles} ${location.pathname === '/company' ? 'bg-cyan-400 text-slate-900 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-400/30' : 'hover:bg-cyan-400/50'}`}>Company</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
