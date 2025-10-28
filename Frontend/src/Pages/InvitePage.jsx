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
       const res = await fetch(`${import.meta.env.VITE_API_URL}/invites/checkinvites/${invitetoken}`, {
  method: "POST",
  credentials: "include",
  headers: { "content-type": "application/json" },
});

        if (res.status == 401) {
          // localStorage.setItem("invitetoken", invitetoken);
          navigate(`/?invitetoken=${invitetoken}`); //redirectin to login
        } else {
          const data = await res.json();
          setInviteData(data.invite);

          if (data.success) {
            toast.success(data.message);
            navigate("/dashboard");
          } else {
            toast.error(data.message);
            navigate("/");
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
   const timer = setTimeout(() => {
        if (invitetoken) {
            checkInvite();
        }
    }, 150);
    
    return () => clearTimeout(timer);
  }, [invitetoken]);
  return <></>;
}

export default InvitePage;
