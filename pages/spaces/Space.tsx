import { useEffect, useState } from "react";
import myApi from "../../api.config";
import Loading from "../loading/Loading";
import { useParams } from "react-router-dom";
import NotFound from "../error/NotFound";
import ServerError from "../error/ServerError";
import NoAuth from "../error/NoAuth";
import NavBar from "../../components/Navbar/NavBar";

export default function Space() {
  const [loading, setLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState<number | undefined>(undefined);
  const { id } = useParams();

  useEffect(() => {
    myApi
      .get(`/api/spaces/${id}`)
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
  }, [id]);

  if (loading) return <Loading />;

  if (apiStatus !== undefined && apiStatus !== 200) {
    // Handle API error
    if (apiStatus === 401) return <NoAuth />;
    if (apiStatus === 403) return <h1>Forbidden</h1>;
    if (apiStatus === 404) return <NotFound />;
    else return <ServerError />;
  }
  return (
    <>
      <NavBar />
      <div className="Space">
        <h1>Space Info page</h1>
      </div>
    </>
  );
}

export interface ISpace {
  _id: string;
  name: string;
  description: string;
  owner: {
    username: string;
  };
  createdAt: Date;
}
