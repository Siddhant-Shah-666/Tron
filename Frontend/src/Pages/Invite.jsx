import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Invite() {
  const navigate = useNavigate();
  const [inviteLink, setInviteLink] = useState(null);
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
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (data?.success) {
      setInviteLink(data?.inviteLink);
      toast.success(data?.message);
    } else toast.error(data.message);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      toast.success("Invite link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link!");
    }
  };

  return (
    <div className="h-[90vh] md:h-[80vh] flex flex-col justify-center items-center gap-5">
      <div className="flex justify-center items-center w-[80vw] md:w-[30vw] rounded md:p-5 border bg-slate-950 border-cyan-400 shadow-lg shadow-cyan-400/30 font-bold">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-3 p-5"
        >
          <h1 className="text-2xl font-bold">Invite New Member</h1>
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
            className="border border-cyan-300 rounded p-2 mb-2 w-[60vw] md:w-[25vw]"
          >
            <option className="bg-slate-800" value="">
              Assign Role
            </option>
            <option className="bg-slate-800" value="Admin">
              Admin
            </option>
            <option className="bg-slate-800" value="Developer">
              Developer
            </option>
            <option className="bg-slate-800" value="Tester">
              Tester
            </option>
          </select>

          <button
            type="submit"
            className="hover:bg-cyan-400 text-white p-2 w-[60vw] md:w-[25vw] rounded border bg-cyan-800 border-cyan-400 shadow-lg shadow-cyan-400/30"
          >
            Send
          </button>
        </form>
      </div>

      {/* Invite link section */}
      {inviteLink && (
        <div className="flex flex-col items-center gap-2 border border-cyan-400 bg-slate-900 rounded p-4 w-[80vw] md:w-[30vw] shadow-lg shadow-cyan-400/20">
          <h2 className="text-lg font-semibold text-cyan-300">Invite Link</h2>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inviteLink}
              readOnly
              className="bg-slate-800 text-white border border-cyan-400 rounded p-2 w-[60vw] md:w-[20vw]"
            />
            <button
              onClick={handleCopy}
              className="bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-2 rounded"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Invite;
