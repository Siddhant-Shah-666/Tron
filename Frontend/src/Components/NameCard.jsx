import { React, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useUser } from "../contextApi/UserContext";

function NameCard({ key, member }) {
  const { isAdmin } = useUser();

  const [formData, setFormData] = useState({
    userid: "",
    role: "",
  });

  useEffect(() => {
    if (member?._id) {
      setFormData((prev) => ({ ...prev, userid: member._id }));
      // console.log("member",member._id);
    }
  }, [member]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form data :", formData);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/updaterole`, {
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

  return (
    <>
      {/* <div className="h-[80vh] w-[80vw] bg-blue-400 flex justify-center items-center text-white"> */}
      <div
        key={key}
        className="h-[16vh] w-[70vw] md:h-[20vh] md:w-[30vw] bg-red-500 rounded-xl flex       border bg-slate-950 border-cyan-400 text-cyan-300 
      shadow-lg shadow-cyan-400/30"
      >
        <div className="img h-[16vh] w-[20vw] md:h-[20vh] md:w-[10vw]  relative flex justify-center items-center rounded-xl">
          <div
            className="pic h-[14vh] w-[20vw] md:h-[18vw] md:w-[10vw]  rounded-xl absolute left-[-3vw] md:left-[-1vw]       border bg-slate-800 border-cyan-400 text-cyan-300 
      shadow-lg shadow-cyan-400/30"
          >
            <img
              // src={`${import.meta.env.VITE_API_URL}/uploads/${member?.image}`}
              src={member?.image}
              alt=" Upload Image"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

        <div
          className="details h-[16vh] w-[50vw] md:h-[20vh] md:w-[20vw]  flex flex-col justify-center items-start p-2 rounded-r-xl  border bg-slate-950 border-cyan-400 text-cyan-300 
      shadow-lg shadow-cyan-400/30"
        >
          <p className="md:text-2xl font-semibold">{member.name}</p>
          <p className="text-xs w-[40vw] md:w-full overflow-x-hidden text-ellipsis ">{member.email}</p>
          <div className="role ">
            <form action="" onSubmit={handleSubmit}>
              {!isAdmin && (
                <>
                <span className="md:text-xl ">Role : {member.role} </span>
                </>
              )}

              {isAdmin && (
                <>
                  <span className="md:text-xl ">Role : </span>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="border border-cyan-300 md:p-1 mb-2 mt-1 h-[4vh] w-[30vw] md:h-[5vh] md:w-[10vw] "
                  >
                    <option className="bg-slate-800" value="">
                      {member.role}
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
                    className="bg-blue-500 text-white md:p-1 h-[3.5vh] w-[40vw] md:h-[4vh] md:w-[17vw] rounded-xl text-center border bg-cyan-800 border-cyan-400 shadow-lg shadow-cyan-400/30"
                  >
                    Update
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
      {/* </div>*/}
    </>
  );
}

export default NameCard;
