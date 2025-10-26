import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

function AddCompany() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    image:"",
    name: "",
    desc: ""
  });

  const handleChange = (e) => {
   if(e.target.type === 'file'){
     setFormData({ ...formData, [e.target.name]: e.target.files[0] });
   }
   else{
     setFormData({ ...formData, [e.target.name]: e.target.value });
   }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("image",formData.image);
    formdata.append("name",formData.name);
    formdata.append("desc",formData.desc);    

    console.log("Form data : ", formData);
    try {
      const res = await fetch("https://tron-bug-tracking.onrender.com/company/createcompany", {
          method : "POST",
        credentials:"include",
        // headers:{
        //   "content-type":"application/json",
        // },
        body: formdata, 
      });
      const data = await res.json();
      

      if(data.success){
              navigate("/dashboard");
              toast.success(data.message)
            }
            else(
               toast.error(data.message)
            )

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="h-[90vh] md:h-[80vh]  flex  justify-center items-center">
        <div className="flex flex-col font-bold justify-center items-center w-[80vw] md:w-[30vw]  rounded p-5 border bg-slate-950 border-slate-400 shadow-lg shadow-cyan-400/30">
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-3"
          >
            <h1 className="text-2xl font-bold ">Create Company</h1>
            <input
              type="file"
              placeholder="Image"
              name="image"
              // value={formData.image}
              onChange={handleChange}
              accept="image/*"
              className="border border-cyan-300 rounded p-2 mb-2  w-[60vw] md:w-[25vw]"
            />
            <input
              type="text"
              placeholder="Username"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-cyan-300 rounded p-2 mb-2  w-[60vw] md:w-[25vw]"
            />
            <textarea
              placeholder="About Company"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              className="border border-cyan-300 rounded p-2 mb-2 h-[10vh]  w-[60vw] md:w-[25vw] resize-none"
            ></textarea>
            <button
              type="submit"
              className="hover:bg-cyan-400 text-white p-2  w-[60vw] md:w-[25vw] rounded border bg-cyan-800 border-cyan-400 shadow-lg shadow-cyan-400/30"
            >
              Company
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddCompany;
