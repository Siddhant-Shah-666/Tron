import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddTicket() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    project: "",
    priority: "",
    status: "",
    ticketType: "",
  });

  const [projects, setProjects] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/projects/getproject", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const projectz = data.company.projects;
        console.log("pooo", projectz);

        setProjects(projectz);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form data :", formData);

    const res = await fetch("http://localhost:3000/tickets/createticket", {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (data.success) {
      navigate(-1);
      toast.success(data.message);
    } else toast.error(data.message);

    console.log(data);
  };

  return (
    <>
      <div className="h-[90vh] md:h-[80vh]  flex  justify-center items-center">
        <div className="flex flex-col justify-center items-center   w-[8 w-[60vw] md:0vw] md:w-[30vw] rounded p-5  border bg-slate-950 border-cyan-400 shadow-lg shadow-cyan-400/30 font-bold">
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-3"
          >
            <h1 className="text-2xl font-bold ">Issue Ticket</h1>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Title"
              onChange={handleChange}
              className="border border-cyan-300 rounded p-2 mb-2  w-[60vw] md:w-[25vw]"
            />
            <textarea
              placeholder="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="border border-cyan-300 rounded p-2 mb-2 h-[10vh]  w-[60vw] md:w-[25vw] resize-none"
            ></textarea>
            <select
              name="project"
              value={formData.project}
              onChange={handleChange}
              className="border border-cyan-300 rounded p-2 mb-2  w-[60vw] md:w-[25vw]"
            >
              <option className="bg-slate-800" value="">Projects</option>
              {projects &&
                projects.map((project) => (
                  <option  className="bg-slate-800" key={project?._id} value={project?._id}>
                    {project?.name}
                  </option>
                ))}
            </select>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="border border-cyan-300 rounded p-2 mb-2  w-[60vw] md:w-[25vw]"
            >
              <option className="bg-slate-800" value="">Priority</option>
              <option className="bg-slate-800" value="Low">Low</option>
              <option className="bg-slate-800" value="Medium">Medium</option>
              <option className="bg-slate-800" value="High">High</option>
            </select>
            {/* <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border border-cyan-300 rounded p-2 mb-2  w-[60vw] md:w-[25vw]"
            >
              <option className="bg-slate-800" value="">Status</option>
              <option className="bg-slate-800" value="Open">Open</option>
              <option className="bg-slate-800" value="Progress">In Progress</option>
              <option className="bg-slate-800" value="Resolved">Resolved</option>
              <option className="bg-slate-800" value="Closed">Closed</option>
            </select> */}
            <select
              name="ticketType"
              value={formData.ticketType}
              onChange={handleChange}
              className="border border-cyan-300 rounded p-2 mb-2  w-[60vw] md:w-[25vw]"
            >
              <option className="bg-slate-800" value="">Ticket Type</option>
              <option className="bg-slate-800" value="Bug">Bug</option>
              <option className="bg-slate-800" value="Feature">Feature</option>
              <option className="bg-slate-800" value="Improvement">Improvement</option>
              <option className="bg-slate-800" value="Support">Support</option>
            </select>

            <button
              type="submit"
              className="hover:bg-cyan-400 text-white p-2  w-[60vw] md:w-[25vw] rounded border bg-cyan-800 border-cyan-400 shadow-lg shadow-cyan-400/30"
            >
              Report
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddTicket;
