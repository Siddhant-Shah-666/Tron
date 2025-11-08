import {React,useState,useEffect} from 'react'

import StatsCard from '../Components/Dashboard/StatsCard'
import Tickets from '../Components/Tickets'
function Mytasks() {
 
   const [tickets, setTickets] = useState(null);

  useEffect(()=>{
     
      try {
        console.log("try");

        fetch(`${import.meta.env.VITE_API_URL}/tickets/gettickets/byuser`, {
          method: "GET",
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data.tickets,"mytask");

            setTickets(data.tickets);
          });
      } catch (err) {
        console.error(err);
      }
    
  },[])


  return (
    <>
    <div className=' w-[100vw] md:max-w-[80vw] bg-blue-6 flex flex-col justify-start md:items-center text-white '>
      <div className="stats w-full h-auto md:h-[23vh] px-4 py-6 grid  grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 bg-red-40">
        <StatsCard title="Total Tickets" stats={tickets?.length} />
        <StatsCard title="Opened Tickets" stats={tickets?.filter(ticket => ticket.status === "Open").length} />
           <StatsCard title="In Progress" stats={tickets?.filter(ticket => ticket.status === "Progress").length} />
        <StatsCard title="Closed Tickets" stats={tickets?.filter(ticket => ticket.status === "Closed").length} />
       
        
      </div>
      <div className=' w-[100vw] md:w-[80vw] bg-blue-30 flex flex-col md:flex-row justify-center md:justify-start flex-wrap items-center  text-white'>

           {tickets && <Tickets tickets ={tickets} mytask={true}  /> }
      
      </div>
      
      
    </div>
    </>
  )
}

export default Mytasks
