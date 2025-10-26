import React, { useState,useEffect } from "react";
import { toast } from "react-toastify";
import { useUser } from "../contextApi/UserContext";
import { useNavigate } from "react-router-dom";

function AddProject() {

  const {isAdmin} = useUser()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    message: "",
    manager: "",
    priority: "",
    image: null,
    // imagePreview:null
  });

  const [company, setCompany] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/company/getcompany`, {
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

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] }); //handle image
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("image", formData.image);
    formdata.append("name", formData.name);
    formdata.append("message", formData.message);
    formdata.append("priority", formData.priority);
    formdata.append("manager", formData.manager);

    // await FormData()

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/projects/createproject`, {
        method: "POST",
        credentials: "include",
        // headers:{
        //   "content-type":"application/json"
        // },
        body: formdata,
      });
      const data = await res.json();
      if (data.success) {
        navigate(-1);
        toast.success(data.message);
      } else toast.error(data.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="h-[90vh] md:h-[80vh]  flex  justify-center items-center">
        <div className="flex flex-col justify-center items-center   w-[80vw] md:w-[30vw]  rounded p-5 border bg-slate-950 border-cyan-400 shadow-lg shadow-cyan-400/30">
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-3"
          >
            <h1 className="text-2xl font-bold mb-4">Add Project</h1>
          
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Title"
              className="border border-cyan-300 rounded p-2 mb-2  w-[60vw] md:w-[25vw]"
            />
            <textarea
              placeholder="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="border border-cyan-300 rounded p-2 mb-2 h-[10vh] w-[60vw] md:w-[25vw] resize-none"
            ></textarea>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="border border-cyan-300 rounded p-2 mb-2  w-[60vw] md:w-[25vw]"
            >
              <option className="bg-slate-800" value="">
                Priority
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
            {isAdmin && (
              <select
              name="manager"
              value={formData.manager}
              onChange={handleChange}
              className="border border-cyan-300 rounded p-2 mb-2  w-[60vw] md:w-[25vw]"
            ><option className="bg-slate-800" value="">
                Manager
              </option>
              {company &&
                company?.members?.map((member) => (
                  <option className="bg-slate-800" key={member?._id} value={member?._id}>
                    {member?.name}
                  </option>
                ))}
            </select>

            )}
            

            <button
              type="submit"
              className="hover:bg-cyan-400 text-white p-2  w-[60vw] md:w-[25vw] rounded border bg-cyan-800 border-cyan-400 shadow-lg shadow-cyan-400/30"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddProject;
