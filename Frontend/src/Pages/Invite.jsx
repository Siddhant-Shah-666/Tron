import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { use } from "react";

function Invite() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data : ", formData);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/invites/inviteuser`, {
      method: "POST",
      credentials:"include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
        if (data.success) {
          navigate(-1);
          toast.success(data.message);
        } else toast.error(data.message);
    
  };

  return (
    <>
      <div className="h-[90vh] md:h-[80vh]  flex  justify-center items-center">
        {/* <h1>{data.invitelink}</h1> */}
        <div className="flex  justify-center items-center w-[80vw] md:w-[30vw]  rounded md:p-5  border bg-slate-950 border-cyan-400 shadow-lg shadow-cyan-400/30 font-bold ">
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-3 p-5"
          >
            <h1 className="text-2xl font-bold ">Invite New Member</h1>
            <input
              type="text"
              placeholder="Username"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-cyan-300 rounded p-2 mb-2 w-[60vw] md:w-[25vw]"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-cyan-300 rounded p-2 mb-2 w-[60vw] md:w-[25vw]"
            />
            <textarea
              placeholder="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="border border-cyan-300 rounded p-2 mb-2 h-[10vh] w-[60vw] md:w-[25vw] resize-none"
            ></textarea>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border border-cyan-300 rounded p-2 mb-2  w-[60vw] md:w-[25vw]"
            >
              <option className="bg-slate-800"  value="">Assign Role</option>
              <option className="bg-slate-800" value="Admin">Admin</option>
              <option className="bg-slate-800" value="Developer">Developer</option>
              <option className="bg-slate-800" value="Tester">Tester</option>
            </select>

            <button
              type="submit"
              className="hover:bg-cyan-400 text-white p-2 w-[60vw] md:w-[25vw] rounded border bg-cyan-800 border-cyan-400 shadow-lg shadow-cyan-400/30"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Invite;
