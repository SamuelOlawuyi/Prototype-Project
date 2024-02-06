// Spaces Listing Page for users and guests
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import myApi from "../../api.config";
import { ISpace } from "./Space";
import NavBar from "../../components/Navbar/NavBar";
import NotFound from "../error/NotFound";
import NoAuth from "../error/NoAuth";

export default function Spaces() {
  const [loading, setLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState<number | undefined>(undefined);
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    myApi
      .get("/api/spaces")
      .then((res) => {
        setApiStatus(res.status);
        setSpaces(res.data.spaces);
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
    if (apiStatus === 401) return <NoAuth/>;
    if (apiStatus === 403) return <h1>Forbidden</h1>;
    if (apiStatus === 404) return <NotFound/>;
    else return <h1>Server Error</h1>;
  }

  console.log(spaces);

  const spacesList = spaces.map((space: ISpace) => {
    return (
      <div key={space._id}>
        <h2>{space.name}</h2>
        {/* <h3>{space.owner.username}</h3> */}
        <p>{space.description}</p>
      </div>
    );
  })
  return (
    <div className="Spaces">
      <NavBar/>
      <h1>Spaces Listing Page</h1>
      {spacesList}
    </div>
  );
}
