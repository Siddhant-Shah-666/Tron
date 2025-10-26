import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link , useNavigate, useSearchParams} from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [searchparams] = useSearchParams()
  const invitetoken =searchparams.get('invitetoken')
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form submitted : ", formData);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
        method : "POST",
        credentials:"include",
        headers:{
          "content-type":"application/json",
        },
        body: JSON.stringify(formData), 
      }); //fetch end here
      
      const data = await res.json()
     
      console.log(data);
      if(data.success){
        navigate(`/?invitetoken=${invitetoken}`)
        toast.success(data.message)
      }
      else(
         toast.error(data.message)
      )
      
    } catch(err){
      console.error(err);
      
    }
  };

  return (
    <>
    <div className="h-[90vh] md:h-[80vh]  flex  justify-center items-center">
    <div className="flex flex-col justify-center items-center   w-[80vw] md:w-[30vw]  rounded p-5 border bg-slate-950 border-cyan-400 shadow-lg shadow-cyan-400/30">
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-3 font-bold"
      >
        <h1 className="text-2xl font-bold  ">Sign Up</h1>
        <input
          type="text"
          placeholder="Username"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border border-cyan-300 p-2 mb-2  w-[60vw] md:w-[25vw]"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border border-cyan-300 p-2 mb-2  w-[60vw] md:w-[25vw]"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="border border-cyan-300 p-2 mb-2  w-[60vw] md:w-[25vw]"
        />

        <button
          type="submit"
          className="hover:bg-cyan-400 text-white p-2  w-[60vw] md:w-[25vw] rounded border bg-cyan-800 border-cyan-400 shadow-lg shadow-cyan-400/30"
        >
          Sign Up
        </button>
        <p className="text-gray-500 mb-4  w-[60vw] md:w-[25vw]">
          Already have an account?
          <Link to={`/?invitetoken=${invitetoken}`} className="text-cyan-600 ml-1 hover:text-cyan-400 ">
            Login
          </Link>
        </p>
      </form>
    </div>
    </div>
    </>
  );
}

export default Register;
