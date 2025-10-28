import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function UpdateProfile() {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    image: "",
    name: "",
    email: "",
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users/getuser`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setProfileData(data.user);
      });
  }, []);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setProfileData({ ...profileData, [e.target.name]: e.target.files[0] });
    } else {
      setProfileData({ ...profileData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", profileData.image);
    formData.append("name", profileData.name);
    formData.append("email", profileData.email);

    console.log("Form data : ", formData);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/updateuser`, {
        method: "POST",
        credentials: "include",
        // headers:{
        //   "content-type":"application/json",
        // },
        body: formData,
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
        <div className="flex flex-col justify-center items-center w-[80vw] md:w-[30vw] bg-slate-950 rounded-lg shadow-lg p-5 border  border-cyan-400 shadow-lg shadow-cyan-400/30">
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-3 font-bold"
          >
            <h1 className="text-2xl font-bold ">Update Profile</h1>
            <input
              type="file"
              placeholder="Image"
              name="image"
              // value={profileData.image}
              onChange={handleChange}
              accept="image/*"
              className="border border-cyan-300 rounded p-2 mb-2  w-[60vw] md:w-[25vw]"
            />
            <input
              type="text"
              placeholder="Username"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              className="border border-cyan-300 rounded p-2 mb-2  w-[60vw] md:w-[25vw]"
            />
            <textarea
              placeholder="About Company"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              className="border border-cyan-300 rounded p-2 mb-2 h-[10vh]  w-[60vw] md:w-[25vw] resize-none"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2  w-[60vw] md:w-[25vw] rounded border hover:bg-cyan-400 bg-cyan-800 border-cyan-400 shadow-lg shadow-cyan-400/30"
            >
              Update 
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateProfile;
