import {React,useEffect,useState} from "react";
import StatsCard from "../Components/Dashboard/StatsCard.jsx";
import StatsGraphs from "../Components/Dashboard/StatsGraphs.jsx";
import PriorityGraph from "../Components/Dashboard/PriorityGraph.jsx";
import Tickets from "../Components/Tickets.jsx";
import Ticket2 from "../Components/Ticket2.jsx";

function Dashboard() {
   const [companyid,setCompanyid] = useState(null)
   const [company,setCompany] = useState(null)
const [tickets, setTickets] = useState([]);

    useEffect(()=>{
        fetch(`${import.meta.env.VITE_API_URL}/company/getcompany`,{
            method:"GET",
            credentials:"include"

        })
        .then((res)=> res.json())
        .then((data)=>{
            // console.log("commm",data.company._id);
            setCompany(data.company)
            
            setCompanyid(data?.company?._id)
        }).catch((err)=>{
          
            console.error(err);
        })
    },[])
    console.log(companyid,"heheehheh");
    
    useEffect(()=>{
      if(!companyid || companyid === "null") {
        return
      }else{
         try {
        // console.log("try");
        
        fetch(`${import.meta.env.VITE_API_URL}/tickets/gettickets/bycom/${companyid}`,{
          method: "GET",
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data.tickets);
            
            setTickets(data.tickets)
          });
      } catch (err) {
        console.error(err);
      }
    }
    },[companyid])
  


  return (
    <><div className=" w-[100vw]   md:w-[80vw] bg-blue-00 flex flex-col  justify-start md:items-center text-white">
    <div className="stats w-[100vw] md:w-[77vw] h-auto md:h-[23vh] px-4 py-6 grid  grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 bg-red-40">
  <StatsCard title="Total Projects" stats={company?.projects.length} />
  <StatsCard title="Total Tickets" stats={tickets?.length} />
  <StatsCard title="Open Tickets" stats={tickets?.filter(ticket => ticket.status === "Open").length} />
  <StatsCard title="Closed Tickets" stats={tickets?.filter(ticket => ticket.status === "Closed").length} />
</div>
      <div className="graphs  w-[100vw] md:h-[35vh] md:w-[75vw] bg-blue-40 flex flex-col md:flex-row  flex justify-center items-center gap-5 md:gap-15 ">
        <StatsGraphs tickets={tickets} />
        <PriorityGraph tickets={tickets} />
      </div>
      <div className="tickets w-[100vw] md:w-[75vw] bg-yellow-40 flex flex-col justify-center items-center gap-3 mt-10  ">
   
         {tickets && <Ticket2 tickets ={tickets}  /> }
          {tickets && <Tickets tickets ={tickets} mytask={false}  /> }
       
      </div>
      </div>
    </>
  );
}

export default Dashboard;
