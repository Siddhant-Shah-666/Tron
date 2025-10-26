import React from "react";
import { useState } from "react";
import { useUser } from "../contextApi/UserContext";
import { toast } from "react-toastify";
import { Link,useNavigate,useSearchParams } from "react-router-dom";

function Login() {
  const {login} = useUser()
  const navigate=useNavigate();
  const [searchparams] = useSearchParams();
  const invitetoken = searchparams.get("invitetoken")

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
 console.log("Form data :", formData);
 try{
  const res = await fetch("http://localhost:3000/users/login",{
           method:"POST",
           credentials:"include",
          headers:{
            "content-type":"application/json"
          },
          body: JSON.stringify(formData)
           
 }) ;

 const data = await res.json();
 console.log(data);


 if(data.success){
  login()
  toast.success(data.message)
if(data.companyId) {
  console.log("1");
  
    navigate("/dashboard");
} else if(!data.companyId){
    console.log("2");
    
      navigate("/addcompany");
   }else if(invitetoken){
    console.log("3");
    
      navigate(`/invitepage/${invitetoken}`);
   }
  
 }else(
   toast.error(data.message)
 )
 
 }catch(err){

  console.log(err);
  
 }
 
 
  };

  return (
    <>
    <div className="h-[90vh] md:h-[80vh]  flex  justify-center items-center">
    <div className="flex flex-col justify-center items-center   w-[80vw] md:w-[30vw]  rounded p-5 border bg-slate-800 border-cyan-400 shadow-lg shadow-cyan-400/30">
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-3"
      >
        <h1 className="text-2xl font-bold ">Login</h1>
        <input
          type="text"
          placeholder="User email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border border-cyan-300 rounded p-2 mb-2  w-[60vw] md:w-[25vw]"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="border border-cyan-300 rounded p-2 mb-2  w-[60vw] md:w-[25vw]"
        />
        <Link to="/forgot-password" className="text-cyan-500 mb-1  w-[60vw] md:w-[25vw]">
          Forgot Password?
        </Link>
        <button type="submit" className="hover:bg-cyan-400 text-white p-2  w-[60vw] md:w-[25vw] rounded border bg-cyan-950 border-cyan-400 shadow-lg shadow-cyan-400/30">
          Login
        </button>
        <p className="text-gray-500 mb-4  w-[60vw] md:w-[25vw]">
          Don't have an account?
          <Link to={`/register/?invitetoken=${invitetoken}`} className="text-cyan-400  ">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
    </div>
    </>
  );
}

export default Login;
