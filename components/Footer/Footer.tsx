import logo1 from "./../../assets/images/Blogger-logo1.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="Footer">
      <div>
        <div className="logo">
          <img src={logo1} alt="logo1" />
          <h4>DecaBlog</h4>
        </div>
        <p>
          Decablog is a platform for budding software developers at Decagon to
          explore technical writing and leverage the community to ask insightful
          questions and get answers - to connect and to help one another achieve
          the world-class developer dream.
        </p>
      </div>
      <div className="copy-right">
        <p>
          Copyright &copy; {new Date().getFullYear()}. All rights reserved.
          Privacy & Terms.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
