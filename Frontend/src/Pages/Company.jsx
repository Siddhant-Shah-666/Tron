import { React, useEffect, useState } from "react";
import NameCard from "../Components/NameCard";
import StatsCard from "../Components/Dashboard/StatsCard";

function Company() {
  const [company, setCompany] = useState(null);
  const [totalTickets, setTotalTickets] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/company/getcompany", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.company) {
          console.log(data.company.projects);

          setCompany(data.company);
          setTotalTickets(
            data.company?.projects?.reduce((acc, project) => {
              return acc + (project.tickets?.length || 0);
            }, 0)
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className=" w-[100vw] md:w-[80vw] flex flex-col justify-center items-center text-white p-2 md:p-5  md:gap-2 relative">
        {/* company card */}
        <div className="h-[25vh] w-[90vw] md:h-[40vh]  md:w-[75vw]  rounded-xl flex ">
          <div className="img h-[25vh] w-[30vw] md:h-[40vh]  md:w-[20vw]  relative flex  justify-center items-center rounded-xl">
           <div className="pic  h-[25vh] w-[30vw] md:h-[40vh]  md:w-[20vw] bg-red-300 rounded-xl        border bg-slate-950 border-cyan-400 text-cyan-300 
      shadow-lg shadow-cyan-400/30">
              <img
                src={`http://localhost:3000/uploads/${company?.image}`}
                alt=""
                className="w-full h-full object-full rounded-xl"
              />
            </div> 
          </div>
          <div className="details h-[25vh] w-[60vw] md:h-[40vh]  md:w-[55vw] flex flex-col justify-start items-start p-2 md:p-4 rounded-r-xl       border bg-slate-950 border-cyan-400 text-cyan-300 
      shadow-lg shadow-cyan-400/30">
            <p className="text-s md:text-2xl font-bold">{company?.name}</p>
            <p className="text-xs md:text-md font-semibold">{company?.desc}</p>
            
          </div>
        </div>
        {/* employee stats */}
        <div className="stats w-full h-auto md:h-[23vh] px-4 py-6 grid  grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 bg-red-40">
          <StatsCard title="Total Members" stats={company?.members?.length} />
          <StatsCard title="Total Projects" stats={company?.projects?.length} />
          <StatsCard title="Active Projects " stats={company?.projects?.filter(project => project.status === "Active").length} />
          <StatsCard title="Total Tickets" stats={totalTickets} />
          
        </div>
        {/* employee list */}
        <div className="employees w-[100vw] md:w-[80vw] bg-red-0  grid grid-cols-1 md:grid-cols-2 place-items-center gap-3 md:gap-5  gap-y-2 md:gap-y-5 md:px-5 ">
          {company?.members?.map((member) => {
            return <NameCard key={member._id} member={member} />;
          })}
        </div>
      </div>
    </>
  );
}

export default Company;
