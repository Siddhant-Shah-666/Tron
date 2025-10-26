import React from 'react'
import {motion} from 'motion/react'
import { useUser } from '../contextApi/UserContext';

import { Link , useLocation,useMatch} from 'react-router-dom'
import icon from "../assets/icon.png"

function Header({toggleNavbar,showNavbar}) {

  const {isAdmin,logout} = useUser()
  

  //  retreive current path
  const location = useLocation(); 
const matchAllTickets = useMatch("/alltickets/:companyId/:projectId?");





  return (
    <header className='w-[100vw] md:w-[85vw] h-[12vh] md:bg-slate-950/90 md:backdrop-blur-md text-white  flex justify-end items-center gap-3 px-5 md:px-10 '>
      <div
        className="h-8 w-8  md:hidden absolute top-5.5 left-5 flex justify-center items-center cursor-pointer rounded z-11  border bg-slate-800 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-400/30"
        onClick={toggleNavbar}
      >
        {showNavbar ? "✖" : "☰"}
      </div>



      {location.pathname === "/dashboard" && isAdmin &&  (
        <Link to="invite"><button className='h-[6vh] w-[25vw] md:h-[6vh] md:w-[10vw] font-bold  text-red-400 hover:text-white rounded hover:bg-red-500 border  border-red-400 shadow-lg shadow-red-400/30 '>Invite+</button></Link>
      )}

      {location.pathname === "/profile" && (
        <button onClick={logout} className='h-[6vh] w-[25vw] md:h-[6vh] md:w-[10vw] font-bold  text-red-400 hover:text-white rounded hover:bg-red-500 border  border-red-400 shadow-lg shadow-red-400/30'>Logout</button>
      )}

      {matchAllTickets && (
        <Link to="addticket"><button className='h-[6vh] w-[25vw] md:h-[6vh] md:w-[10vw] font-bold  text-red-400 hover:text-white rounded hover:bg-red-500 border  border-red-400 shadow-lg shadow-red-400/30 '>New ticket</button></Link>
      )}

      {/* { && (
        <Link to="profile"><button className='h-[6vh] w-[20vw] md:h-[6vh] md:w-[10vw] bg-red-400 font-bold rounded-xl '>Update</button></Link>
      )} */}

      {location.pathname === "/projects" && (
        <Link to="addproject"><button className='h-[6vh] w-[25vw] md:h-[6vh] md:w-[10vw] font-bold  text-red-400 hover:text-white rounded hover:bg-red-500 border  border-red-400 shadow-lg shadow-red-400/30 '>New project</button></Link>
      )}

      {location.pathname === "/company" && isAdmin && (
        <Link to="invite"><button className='h-[6vh] w-[25vw] md:h-[6vh] md:w-[10vw] font-bold  text-red-400 hover:text-white rounded hover:bg-red-500 border  border-red-400 shadow-lg shadow-red-400/30 '>Invite+</button></Link>
      )}

<Link to="profile">
  <motion.button
  animate={{
    rotate:[0,360]
  }}
  transition={{
    duration:3,
    repeat:Infinity,
    repeatType:"loop",
    ease:"linear"
    
  }}
    className='h-9 w-9 font-bold rounded-full mt-1 ml-2 hover:text-white border border-cyan-400 
               shadow-[0_0_12px_3px] shadow-cyan-400/60 '
              
  >
    <img
      src={icon}
      alt="Profile Icon"
      className="w-full h-full object-cover rounded-full"
    />
  </motion.button>
</Link>
    </header>
  )
}

export default Header
