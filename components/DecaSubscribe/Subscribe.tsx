import logo1 from "./../../assets/images/Blogger-logo1.png";
import email from "./../../assets/images/mail.png";
import manImage from "./../../assets/images/email.svg";
import "./subscribe.css";
import { useState } from "react";

export default function Subscribe() {
  const [emailInput, setEmailInput] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmailInput(e.target.value);
  }

  return (
    <div className="Subscribe">
      <div className="text">
        <div className="logo-decablog">
          <img className="Logo1" src={logo1} alt="logo" />
          <h3>DecaBlog</h3>
        </div>
        <h2>
          Connect with other developers at Decagon through writing and insigtful
          engagements
        </h2>
        <form>
          <div>
            <label htmlFor="email">
              <img src={email} alt="emailpix" className="emailpix" />
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={emailInput}
              onChange={handleChange}
            />
          </div>
          <button className="btn green">Subscribe Now</button>
        </form>
      </div>
      <div className="image">
        <img src={manImage} alt="male photo" />
      </div>
    </div>
  );
}
