import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../contextApi/UserContext";

import ChatCard from "../Components/ChatCard";
import io from "socket.io-client";

function ViewTickets() {
  const {isAdmin} = useUser()
  const { ticketId } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users/getuser`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.user?.assignedTickets?.length);

        setUser(data.user);

      });
  }, []);

  const [messages, setMessages] = useState([]);

useEffect(() => {
    const fetchChatHistory = async () => {
        if (!ticketId) return;
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/chats/getchats/${ticketId}`);
            if (response.ok) {
                const history = await response.json();
                setMessages(history);
            }
        } catch (error) {
            console.error("Failed to fetch chat history:", error);
        }
    };

    fetchChatHistory();
}, [ticketId]); // It runs whenever the ticketId changes



  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);

  const [members, setMembers] = useState(null);

  useEffect(() => {
    const newSocket = io(`${import.meta.env.VITE_API_URL}`);
    setSocket(newSocket);

    newSocket.emit("joinTicket", ticketId);

    newSocket.on("receiveMessage", (data) => {
      if (data.ticketId === ticketId) {
        setMessages((p) => [...p, data]);
      }
    });

    return () => {
      newSocket.off("receiveMessage");
      newSocket.disconnect();
    };
  }, [ticketId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    
    if (!socket || !input.trim() || !user) return;

    //  message payload 
    const messageData = {
      ticketId: ticketId,
     userId: {
            _id: user?._id,
            name: user?.name // Include the name here!
        },
      message: input,
    };

    socket.emit("sendMessage", messageData);


    
    setInput("");
  };

  //update ticket data
  const [formData, setFormData] = useState({
    ticketid: ticketId,
    assignedTo: "",
    status: "",
  });
  // fetching members
  useEffect(() => {
    const fetchMembers = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/company/getcompany`, {
        method: "GET",
        credentials: "include",
      });
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

    const res = await fetch(`${import.meta.env.VITE_API_URL}/tickets/updateticket`, {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (data.success) {
      // navigate(-1);
      toast.success(data.message);
    } else toast.error(data.message);
  };

  const [ticketDetails, setTicketDetails] = useState([]);

  useEffect(() => {
    const fetchticket = async () => {
      try {
        if (ticketId) {
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/tickets/gettickets/byid/${ticketId}`,
            {
              method: "GET",
              credentials: "include",
            }
          );
          const data = await res.json();
          if (data.ticket) {
            console.log(data.ticket);
            setTicketDetails(data.ticket);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchticket();
  }, []);

  return (
    <>
      <div className="w-[100vw] md:w-[80vw]  flex flex-col justify-center items-center text-white p-5 gap-5 ">
        {/* ticketDetails */}
        {ticketDetails && (
          <div className=" w-[100vw] md:w-[70vw]  flex flex-col justify-center items-start rounded font-bold p-3 gap-2 border bg-slate-950 border-cyan-400 shadow-lg shadow-cyan-400/30 text-cyan-400 ">
            <p className="text-xl">Project : {ticketDetails?.project?.name}</p>
            <p className="text-2xl font-semibold">
              Ticket : {ticketDetails?.name}
            </p>
            <p>Info : {ticketDetails?.message}</p>
            <p className="text-xl">Submitter : {ticketDetails?.reportedBy?.name}</p>

            <div className=" w-full ">
              <form action="" className="flex gap-3" onSubmit={handleSubmit}>
                {!isAdmin && (<p className="text-xl mr-5">Developer : {ticketDetails?.assignedTo?.name}</p>)}
                
                {isAdmin && (
                  <>
                  <span className="text-xl">Developer : </span>
                  <select
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleChange}
                  className="border border-cyan-300 rounded-lg p-2 mb-2  w-[60vw] md:w-[15vw]"
                >
                  <option className="bg-slate-800" value="">{ticketDetails?.assignedTo?.name}</option>
                  {members &&
                    members.map((member) => (
                      <option key={member?._id} value={member?._id}>
                        {member?.name}
                      </option>
                    ))}
                </select>
                  </>
                  

                )}


                <span className="md:text-xl ">Status : </span>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="border border-cyan-300 rounded-lg p-1 mb-2  w-[20vw] md:w-[10vw] "
                >
                  <option className="bg-slate-800" value="">{ticketDetails.status}</option>
                  <option className="bg-slate-800" value="Open">Open</option>
                  <option className="bg-slate-800" value="Progress">In Progress</option>
                  <option className="bg-slate-800" value="Resolved">Resolved</option>
                  <option className="bg-slate-800" value="Closed">Closed</option>
                </select>
                <button
                  type="submit"
                  className="bg-blue-500 text-white  h-[5vh]  w-[20vw] md:w-[8vw] rounded-xl hover:bg-cyan-400 border bg-cyan-800 border-cyan-400 shadow-md shadow-cyan-400/30"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        )}

        {/* chatBox */}
        <div className="w-[100vw] md:w-[70vw] h-[50vh]  flex flex-col items-start rounded p-3 gap-2 overflow-y-auto border bg-slate-950 border-cyan-400 shadow-lg shadow-cyan-400/30">
          {messages.map((msg, index) => (
            <ChatCard key={index} message={msg} currentUser={user}  />
          ))}
        </div>

        {/* Input Form */}
        <div className="w-[100vw] md:w-[70vw] h-[10vh]  flex justify-center rounded items-center border bg-slate-950 border-cyan-400 shadow-lg shadow-cyan-400/30">
          <form
            onSubmit={handleSendMessage}
            className="w-full flex justify-center items-center gap-3 text-cyan-300"
          >
          
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="h-[5vh] w-[40vw] text-cyan-400 font-bold rounded p-2  border bg-slate-800 border-cyan-400 shadow-md shadow-cyan-400/30"
              placeholder="Type a message..."
            />
            <button
              type="submit"
              className="h-[5vh] w-[8vw] hover:bg-cyan-400 text-white font-bold rounded border bg-cyan-800 border-cyan-400 shadow-md shadow-cyan-400/30"
            >
              Send
            </button>
          </form>
        </div>
        {/* ticket history box */}
        <div className="w-[100vw] md:w-[70vw] flex flex-col justify-center items-start font-bold gap-3 p-5 border rounded-lg bg-slate-950 border-cyan-400 shadow-lg shadow-cyan-400/30">
          <h3 className="text-xl font-bold">Ticket History</h3>
          {ticketDetails?.history?.map((entry, index) => (
            <div key={index} className="w-[100vw] md:w-[65vw]  text-cyan-300 p-2 border rounded-lg bg-slate-950 border-cyan-400 shadow-lg shadow-cyan-400/30">
              <p>
                {entry.change} by {entry.changedBy?.name} at{" "}
                {new Date(entry.date).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ViewTickets;
