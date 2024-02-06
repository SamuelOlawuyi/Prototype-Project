import "./NotificationModal.css";
// import dots from "../../assets/images/3dots.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function NotificationsModal({ notifications }: INotifs) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".modal-window")) {
        if (!target.closest(".modal-content")) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const notificationList = notifications.map((notification) => {
    const storyId = notification.objectId
    return (
      <Link to={`/stories/${storyId}`} key={notification.id}>
        <div className="notif-item">
          <div>{notification.message}</div>
          <div>{notification.time}</div>
        </div>
      </Link>
    );
  });

  return (
    <div className="modal-window">
      <div className="overlay"></div>
      <div className="modal-content">
        <div className="modal-notification">Notifications</div>
        <div className="notification-divider"></div>
        <div className="notifs">{notificationList}</div>
        {/* <div className="notification-body">
          <div className="individual-notification">
            <h1 className="time-frame">2 hours ago</h1>
            <div className="activity-n-dot">
              <div className="activity-likes">
                <h1 className="activity">New activity</h1>
                <p className="likes">You have 2 likes on your stories</p>
              </div>
              <Link to="#" className="link-img">
                <img className="dots-horizontal" src={dots} alt="Dots" />
              </Link>
            </div>
          </div>
          <div className="activity-n-dot">
            <div className="activity-likes">
              <div className="activity">Comment</div>
              <p className="likes">You have 5 new comments on your post</p>
            </div>
            <Link to="#" className="link-img">
              <img className="dots-horizontal" src={dots} alt="Dots" />
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default NotificationsModal;

interface INotif{
  id: string;
  message: string;
  objectId: string;
  read: boolean;
  time: string;
}

interface INotifs{
  notifications: INotif[]
}