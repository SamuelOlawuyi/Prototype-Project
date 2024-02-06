import "./profileModal.css";
import settings from "../../assets/images/accountSettings.png";
import profile from "../../assets/images/profilepixIcon.png";
import logout from "../../assets/images/logoutIcon.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import myApi from "../../api.config";

function ProfileModal({user}: ProfileModalProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    myApi.defaults.headers["Authorization"] = "";
    myApi
      .post("/auth/logout")
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err.response);
      });
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".Profilemodal-window")) {
        if (!target.closest(".Profilemodal-content")) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="Profilemodal-window">
      <div className="Profilemodal-content">
        {/* <div className="modal-notification">Notifications</div> */}
        <div className="profileModal-divider"></div>
        <div className="AllImg">
          <Link to="/user/profile" className="profileModal-img-text">
            <img className="profileModal-img" src={profile} alt="profile" />
            <p className="profileModal-text"> {user.toUpperCase()}</p>
          </Link>
          <Link to="/settings" className="profileModal-img-text">
            <img className="profileModal-img" src={settings} alt="settings" />
            <p className="profileModal-text"> Settings</p>
          </Link>
          <Link to="/login" className="profileModal-img-text" onClick={handleLogout}>
            <img className="profileModal-img" src={logout} alt="logout" />
            <p className="profileModal-text">Logout</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;


interface ProfileModalProps {
  user: string;
}