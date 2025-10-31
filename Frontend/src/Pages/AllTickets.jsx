import { React, useState, useEffect } from "react";
import Ticket2 from "../Components/Ticket2";
import StatsCard from "../Components/Dashboard/StatsCard";
import Tickets from "../Components/Tickets";
import { useParams } from "react-router-dom";
import { useUser } from "../contextApi/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AllTickets() {
  const navigate = useNavigate();
  const { isAdmin } = useUser();
  const { projectId, companyId } = useParams();

  const [project, setProject] = useState(null);
  const [tickets, setTickets] = useState(null);
  const [user, setUser] = useState(null);
  const [members, setMembers] = useState(null);

  const [formData, setFormData] = useState({
    projectid: projectId,
    manager: "",
    status: "",
    priority: "",
  });

  // fetching members
  useEffect(() => {
    const fetchMembers = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/company/getcompany`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      console.log("members", data.company.members);

      setMembers(data.company.members);
    };
    fetchMembers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form data :", formData);

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/projects/updateproject`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await res.json();
    if (data.success) {
      // navigate(-1);
      toast.success(data.message);
    } else toast.error(data.message);
  };

  useEffect(() => {
    try {
      fetch(
        `${import.meta.env.VITE_API_URL}/projects/project/getbyid/${projectId}`,
        {
          method: "GET",
          credentials: "include",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "newwwww");

          setProject(data.project);
        });
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (companyId && projectId) {
      console.log("com22");

      try {
        fetch(
          `${
            import.meta.env.VITE_API_URL
          }/tickets/gettickets/bypro/${projectId}`,
          {
            method: "GET",
            credentials: "include",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);

            setUser(data.userId);
            setTickets(data.tickets);
          });
      } catch (err) {
        console.error(err);
      }
    } else if (companyId != null) {
      console.log(companyId, "comm2222222222222");

      try {
        console.log("try");

        fetch(
          `${
            import.meta.env.VITE_API_URL
          }/tickets/gettickets/bycom/${companyId}`,
          {
            method: "GET",
            credentials: "include",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            // console.log(data.tickets,"rrrrr");

            setTickets(data.tickets);
          });
      } catch (err) {
        console.error(err);
      }
    }
  }, [companyId, projectId]);

   const dropProject =async()=>{
      
     const res = await fetch(
        `${import.meta.env.VITE_API_URL}/projects/dropproject`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({projectId}),
        }
      );
  
      const data = await res.json();
      if (data.success) {
       
        toast.success(data.message);
         navigate(-1);
      } else toast.error(data.message);
  
    }

  return (
    <>
      <div className="w-full   md:w-[80vw] bg-blue-00 flex flex-col  justify-start md:items-center text-white">
        {projectId && (
          <div className="w-[100vw] md:w-[75vw]  flex flex-col justify-center items-start rounded font-bold p-3 gap-2 border bg-slate-950/40 backdrop-blur-md  border-cyan-400 shadow-lg shadow-cyan-400/30 text-cyan-400 ">
            <p className="text-xl">Project : {project?.name}</p>
            {/* <p className="text-2xl font-semibold">
              Ticket : {ticketDetai?.name}
            </p> */}
            <p>Info : {project?.message}</p>
            {/* <p className="text-xl"> : {ticketDetails?.reportedBy?.name}</p> */}

            <div className=" w-full ">
              <form
                action=""
                className="flex  gap-3 flex flex-col"
                onSubmit={handleSubmit}
              >
                {!isAdmin && (
                  <p className="text-xl mr-5">
                    Developer : {project?.manager?.name}
                  </p>
                )}

                <div className="manager">
                  {isAdmin && (
                    <>
                      <span className="text-xl">Manager : </span>
                      <select
                        name="manager"
                        value={formData.manager}
                        onChange={handleChange}
                        className="border border-cyan-300 rounded-lg p-2 mb-2  w-[60vw] md:w-[15vw]"
                      >
                        <option className="bg-slate-800" value="">
                          {project?.manager?.name}
                        </option>
                        {members &&
                          members.map((member) => (
                            <option key={member?._id} value={member?._id}>
                              {member?.name}
                            </option>
                          ))}
                      </select>
                    </>
                  )}
                </div>
                <div className="StatusAndPriorityAndUpdate flex flex-col md:flex-row gap-3 ">
                  <div className="statuspriorityonly  flex gap-3">
                    <span className="md:text-xl ">Status : </span>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="border border-cyan-300 rounded-lg p-1 mb-2  w-[25vw] md:w-[10vw] "
                    >
                      <option className="bg-slate-800" value="">
                        {project?.status}
                      </option>
                      <option className="bg-slate-800" value="Open">
                        Open
                      </option>
                      <option className="bg-slate-800" value="Progress">
                        Progress
                      </option>
                      <option className="bg-slate-800" value="Resolved">
                        Resolved
                      </option>
                      <option className="bg-slate-800" value="Closed">
                        Closed
                      </option>
                    </select>
                  

                  
                    <span className="md:text-xl ">Priority : </span>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="border border-cyan-300 rounded-lg p-1 mb-2  w-[25vw] md:w-[10vw] "
                    >
                      <option className="bg-slate-800" value="">
                        {project?.priority}
                      </option>
                      <option className="bg-slate-800" value="Low">
                        Low
                      </option>
                      <option className="bg-slate-800" value="Medium">
                        Medium
                      </option>
                      <option className="bg-slate-800" value="High">
                        High
                      </option>
                    </select>
                  </div>

                  
                </div>
                <div className="action w-full flex justify-center md:justify-start gap-2 md:gap-4">
                   <button
                  type="submit"
                  className="bg-blue-500 text-white  h-[4vh] md:h-[5vh]  w-[60vw] md:w-[15vw]  rounded-xl hover:bg-cyan-400 border bg-cyan-800 border-cyan-400 shadow-md shadow-cyan-400/30"
                >
                  Update
                </button>
                   <button
                  type="button"
                  onClick={dropProject}
                  className=" text-red-600 hover:text-white  h-[4vh] md:h-[5vh]  w-[30vw] md:w-[8vw]  rounded-xl hover:bg-red-500 border  border-red-400 shadow-md shadow-red-400/30"
                >
                  Drop
                </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="stats w-full md:w-[77vw] h-auto md:h-[23vh] px-4 py-6 grid  grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 bg-red-40">
          <StatsCard title="Total Tickets" stats={tickets?.length} />
          <StatsCard
            title="Open Tickets"
            stats={tickets?.filter((ticket) => ticket.status === "Open").length}
          />
          <StatsCard
            title="High Priority"
            stats={
              tickets?.filter((ticket) => ticket.priority === "High").length
            }
          />
          <StatsCard
            title="Close Tickets"
            stats={
              tickets?.filter((ticket) => ticket.status === "Closed").length
            }
          />
        </div>

        <div className=" w-full bg-blue-30 flex flex-col justify-start items-center text-white">
          {tickets && <Ticket2 tickets={tickets} userId={user} />}
          {tickets && (
            <Tickets tickets={tickets} mytask={false} userId={user} />
          )}
        </div>
      </div>
    </>
  );
}

export default AllTickets;
