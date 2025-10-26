import { React, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function InvitePage() {
  const [inviteData, setInviteData] = useState(null);

  const { invitetoken } = useParams();
  console.log(invitetoken, "token");

  const navigate = useNavigate();

  useEffect(() => {
    const checkInvite = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/invites/checkinvites/${invitetoken}`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "content-type": "application/json",
            },
          }
        );
        if (res.status == 401) {
          localStorage.setItem("invitetoken", invitetoken);
          navigate(`/?invitetoken=${invitetoken}`); //redirectin to login
        } else {
          navigate("/dashboard")
          const data =await res.json();
          
          
          setInviteData(data.invite);
              if (data.success) {
                // navigate(-1);
                toast.success(data.message);
              } else toast.error(data.message);
          // console.log("added");
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (invitetoken) {
      checkInvite();
    }
  }, [invitetoken]);
  return (
    <>
      <div className=" w-[80vw] bg-blue-30 flex flex-col justify-start md:items-center text-white">
        {inviteData && (
          <div className="md:hidden h-[20vh] w-[90vw] md:h-[30vh] md:w-80 bg-gradient-to-r from-blue-500 to-blue-200 rounded-xl flex flex-col justify-center items-start p-3 md:px-8 gap-1 md:gap-2 m-2 ml-3">
            <h2 className="font-bold text-xl md:text-2xl">
              Name : {inviteData?.name}
            </h2>
            <h3 className="md:text-l">Message : {inviteData?.message}</h3>
            <div className="w-[80vw] md:w-80 bg-red-60 flex gap-5">
              <h3 className="md:text-l">
                <span>E-mail : </span>
                <span className="h-2 bg-red-400 px-4 md:px-2 py-[.2vw] ml-3 rounded-md">
                  inviteData?.email
                </span>
              </h3>
              <h3 className="md:text-l">
                <span>Role : </span>
                <span className="h-2 bg-red-400 px-4 md:px-2 py-[.2vw] ml-3 rounded-md">
                  inviteData?.role
                </span>
              </h3>
            </div>
            <h3 className="md:text-l">Invited by : {inviteData?.invitedBy}</h3>
            <Link to={`/dashboard`}>
              <button className="h-[5vh] w-[8vw] bg-red-300 rounded-xl ">
                Accept invitation
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default InvitePage;
