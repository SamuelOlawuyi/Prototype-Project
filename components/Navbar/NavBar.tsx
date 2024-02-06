import { useEffect, useState } from "react";
import "./Navbar.css";
import myApi from "../../api.config";
import { Link } from "react-router-dom";
import NotificationsModal from "../modals/NotificationModal";
import ProfileModal from "../modals/profileModal";
import blogLogo from "../../assets/images/Blogger-logo1.png";
import homeIcon from "./../../assets/images/icons8-home-32.png";
import notifyIcon from "./../../assets/images/icons8-bell-100.png";
import searchIcon from "./../../assets/images/search.png";
import spaceIcon from "./../../assets/images/users.png";
import avatar from "./../../assets/images/avatar-female.svg";
import CreateStoryModal from "../modals/createStory/CreateStory";
// import { ThemeContext } from "../../App";
// import ReactSwitch from "react-switch"; // Import ReactSwitch

export default function NavBar() {
  const [user, setUser] = useState("");
  const [query, setQuery] = useState("");
  const [NotificationModalVisible, setNotificationModalVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [showCreateStory, setShowCreateStory] = useState(false);

  // const { theme, toggleTheme } = useContext(ThemeContext) ?? {
  //   theme: "",
  //   toggleTheme: () => {},
  // };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // onSearch(query);
  };

  const performSearch = () => {
    console.log("Performing search...");
  };

  const toggleModal = () => {
    setNotificationModalVisible(!NotificationModalVisible);
  };

  const toggleProfileModal = () => {
    setProfileModalVisible(!profileModalVisible);
  };

  const toggleWrite = () => {
    setShowCreateStory(!showCreateStory);
  };

  useEffect(() => {
    myApi.get("/api/users/me")
      .then((res) => {
        setUser(res.data.user.username);
        localStorage.setItem("userId", res.data.user._id);
        setNotifications(res.data.notifications);
      })
      .catch(() => setUser(""));
  }, []);

  return (
    <div className={`navbar`}>
      {NotificationModalVisible && (
        <NotificationsModal notifications={notifications} />
      )}
      {profileModalVisible && <ProfileModal user={user} />}
      {showCreateStory && (
        <CreateStoryModal setOpenModal={setShowCreateStory} />
      )}

      <div className="group1-xy">
        <div className="blog-logo-xy">
          <Link to="/">
            <img src={blogLogo} alt="blog logo" />
          </Link>
          <span>DecaBlog</span>
        </div>
        <div className="icons-group">
          <Link to="/stories">
            <img src={homeIcon} alt="home" />
          </Link>
          <Link to="/spaces">
            <img className={user ? "" : "hidden"} src={spaceIcon} alt="space" />
          </Link>

          <img src={notifyIcon} alt="notification" onClick={toggleModal} />
          {/* <ReactSwitch
              onChange={toggleTheme}
              checked={theme === "dark"}
            />{" "} */}
        </div>
      </div>
      <form className="navbar-form" onSubmit={handleSubmit}>
        <label htmlFor="search">
          <img src={searchIcon} alt="search" onClick={performSearch} />
        </label>
        <input
          className="navbar-search"
          type="search"
          id="search"
          placeholder="Search"
          value={query}
          onChange={handleInputChange}
        />
      </form>

      <div className="group2-xy">
        <div className={user ? "" : "hidden"}>
          <img
            src={avatar}
            alt="avatarIcon"
            onClick={toggleProfileModal}
            className="avatar profile-pic"
          />
        </div>

        {/* <Link to="/create-story"> */}
        <button
          className={`btn grey ${user ? "" : "hidden"}`}
          onClick={toggleWrite}
        >
          Write An Article
        </button>
        {/* </Link> */}

        <Link to={user ? "/add-question" : "/login"}>
          <button className="btn green">
            {user ? "Questions" : "Get Started"}
          </button>
        </Link>
      </div>
    </div>
  );
}

{
  /* // function onSearch(_query: string) {
//   console.error("Search feature not implemented yet");
// } */
}
