import React from 'react'
import icon from "../../assets/icon.png"

function StatsCard(props) {
  return (
    <div className='
      h-[12vh] w-[40vw] md:h-[15vh] md:w-[17vw] 
      rounded-xl flex flex-col justify-start md:justify-center items-start  p-3
      md:p-5 md:p-5 gap-y-1 md:gap-y-2 relative 
      
      border bg-slate-950/40 backdrop-blur-md border-cyan-400 text-cyan-300 
      shadow-lg shadow-cyan-400/30
    '>
      <h3 className='text-lg md:text-xl'>{props.title}</h3>
      <h2 className='text-xl font-bold md:text-4xl'>{props.stats}</h2>
      <img className='w-8 absolute top-13 right-5' src={icon} alt="" />
    </div>
  )
}

export default StatsCard