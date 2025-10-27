import React from 'react'
import { Link } from 'react-router-dom';

function Tickets({ tickets,mytask }) {
  console.log(tickets,"here my tickets");
  
  return (
    <>
      {tickets && tickets?.map((ticket) => (
        <div key={ticket?._id} className={` ${!mytask ? "flex md:hidden" : "hidden md:flex"} w-[90vw] md:h-[30vh] md:w-[25vw]   rounded-xl font-bold flex flex-col justify-center items-start p-3 md:py-20 md:px-8 gap-1 md:gap-2 m-2  border bg-slate-950/40 backdrop-blur-md  border-cyan-400 text-cyan-300 
      shadow-lg shadow-cyan-400/30 `}>
          <h2 className='font-bold text-xl md:text-2xl text-white'>Bug : {ticket?.name}</h2>
          <h3 className='md:text-l'>Reported by : {ticket?.reportedBy?.name}</h3>
          <div className="w-[80vw] md:w-80 bg-red-60 flex gap-5">
            <h3 className='md:text-l'>
              <span>Priority : </span>
              <span className='h-2  px-2 md:px-2 py-[.2vw] ml-1 rounded-md border text-white  border-white shadow-lg shadow-white/30'>{ticket.priority}</span>
            </h3>
            <h3 className='md:text-l'>
              <span>Status : </span>
              <span className='h-2  px-2 md:px-2 py-[.2vw] ml-1 rounded-md  border text-white  border-white shadow-lg shadow-white/30'>{ticket.status}</span>
            </h3>
          </div>
           <h3 className='md:text-l'>Assigned To : {ticket?.assignedTo?.name}</h3>
        <Link to={`/viewtickets/${ticket?._id}`}><button className='h-[5vh] w-[80vw] md:w-[20vw]  rounded-xl text-white rounded hover:bg-cyan-500 border bg-cyan-800  border-cyan-400 shadow-lg shadow-cyan-400/30'>View</button></Link>
        </div>
      ))}
    </>
  );
}

export default Tickets;