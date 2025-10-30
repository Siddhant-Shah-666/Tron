import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contextApi/UserContext";

function Profile() {
  const {user} = useUser()


  return (
    <>
    {user?.assignedTickets && (
      <div className="h-[90vh] w-[100vw] md:h-[80vh] md:w-[80vw] bg-grey-400 flex justify-center items-center text-cyan-300">
        <div className="h-120 w-80   rounded-xl    md:mt-5    border bg-slate-950 border-cyan-400 
      shadow-lg shadow-cyan-400/30">
          <div className="img h-50 w-80  relative flex justify-center items-center rounded-xl">
            <div className="pic  h-50 w-70 bg-blue-300 rounded-xl absolute top-[-3vh]   border bg-slate-950 border-cyan-400 shadow-lg shadow-cyan-400/30">
             <img
                // src={`${import.meta.env.VITE_API_URL}/uploads/${user?.image}`}
                src={user?.image}
                alt=""
                className="w-full h-full object-fit rounded-xl"
              />
            </div>
          </div>
          <div className="details h-30 w-80 border border-cyan flex flex-col justify-center items-start p-3 md:p-10">
            <p className="text-2xl font-bold w-70  break-words whitespace-normal">{user?.name}</p>
            <p className="text-s w-70  break-words whitespace-normal">{user?.email}</p>
            <p className="text-xl w-70">Role : {user?.role}</p>
          </div>
          <div className="bugStatus h-35 w-80 bg- flex flex-col justify-center items-center border bg-slate-950 border-cyan-400 shadow-lg shadow-cyan-400/30">
            <p className="h-10 text-2xl font-bold">Proformance</p>
            <div className="bugbox  h-25 w-80 bg-red-40 flex justify-center items-center gap-2">
              <div className="box h-20 w-24  flex flex-col justify-center items-center rounded-lg border bg-slate-950 border-cyan-400 shadow-md shadow-cyan-400/30">
                <p className="text-xl">Assigned</p>
                <p className="font-bold">{user.assignedTickets?.length}</p>
              </div>
              <div className="box h-20 w-24  flex flex-col rounded-lg justify-center items-center border bg-slate-950 border-cyan-400 shadow-md shadow-cyan-400/30">
                <p className="text-xl">Progress</p>
                <p className="font-bold">{user?.assignedTickets?.filter(ticket => ticket.status === "Progress").length}</p>
              </div>
              <div className="box h-20 w-24  flex flex-col rounded-lg justify-center items-center border bg-slate-950 border-cyan-400 shadow-md shadow-cyan-400/30">
                <p className="text-xl">Closed</p>
                <p className="font-bold">{user?.assignedTickets?.filter(ticket => ticket.status === "Closed").length}</p>
              </div>
            </div>
          </div>

          <div className="edit h-15 w-80  relative flex justify-center items-center">
            <Link to="/profileupdate">
              <button className="h-8 w-70  rounded-xl  border bg-cyan-800 border-cyan-400 shadow-lg shadow-cyan-400/30 text-whi95">Edit</button>
            </Link>
          </div>
        </div>
      </div>
    )}
      
    </>
  );
}

export default Profile;
