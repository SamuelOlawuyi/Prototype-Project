import NavBar from "../../components/Navbar/NavBar";
import { useEffect, useState } from "react";
import myApi from "../../api.config";
import Loading from "../loading/Loading";
import "./Home.css";
import { Link } from "react-router-dom";
import image1 from "./../../assets/images/image1.png";
import image2 from "./../../assets/images/image2.jpg";
import image3 from "./../../assets/images/image3.jpg";
import image4 from "./../../assets/images/image4.jpg";
import image5 from "./../../assets/images/image5.jpg";
import image6 from "./../../assets/images/image6.jpg";
import image7 from "./../../assets/images/image7.jpg";
import image8 from "./../../assets/images/image8.jpg";
import Footer from "../../components/Footer/Footer";
import NotFound from "../error/NotFound";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState<number | undefined>(undefined);

  useEffect(() => {
    myApi
      .get("/")
      .then((res) => {
        setApiStatus(res.status);
      })
      .catch((err) => {
        if (!err.response) setApiStatus(500);
        else setApiStatus(err.response.status);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;

  if (apiStatus !== undefined && apiStatus !== 200) {
    // Handle API error
    if (apiStatus === 401) return <h1>Unauthorized</h1>;
    if (apiStatus === 403) return <h1>Forbidden</h1>;
    if (apiStatus === 404) return <NotFound/>;
    else return <h1>Server Error</h1>;
  }

  return (
    <>
      <NavBar />
      <div className="Home">
        <div className="section1">
          <h1 className="headline">
            Join the Decadevs gist space with the latest articles in tech world
          </h1>
          <div className="home-buttons">
            <Link to="/login">
              <button className="btn grey">Get Started</button>
            </Link>
            <Link to="/stories">
              <button className="btn green">See Stories</button>
            </Link>
          </div>
        </div>

        <div className="section-2">
          <h2 className="StackHeading">
            Tips and recomendations on Tech Stacks
          </h2>
          <p className="StackP">
            Read Articles, join spaces hosted by different Decadevs just like
            you.
          </p>
          <div className="img-container">
            <img className="StackImg" src={image1} alt="" title="" />
            <img className="StackImg" src={image2} alt="" />
            <img className="StackImg" src={image3} alt="" />
            <img className="StackImg" src={image4} alt="" />
            <img className="StackImg" src={image5} alt="" />
            <img className="StackImg" src={image6} alt="" />
            <img className="StackImg" src={image7} alt="" />
            <img className="StackImg" src={image8} alt="" />
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
