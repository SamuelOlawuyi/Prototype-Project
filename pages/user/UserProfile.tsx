import { useEffect, useState } from "react";
import NavBar from "../../components/Navbar/NavBar";
import "./UserProfile.css";
import Loading from "../loading/Loading";
import myApi from "../../api.config";
import NoAuth from "../error/NoAuth";

export default function UserProfile() {
  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState<number | undefined>(undefined);

  useEffect(() => {
    myApi
      .get("/api/users/me")
      .then((res) => {
        setData(res.data);
        setApiStatus(res.status);
      })
      .catch((err) => {
        if (!err.response) setApiStatus(500);
        else setApiStatus(err.response.status);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  if (apiStatus !== undefined && apiStatus !== 200) {
    // Handle API error
    if (apiStatus === 401) return <NoAuth/>;
    if (apiStatus === 403) return <h1>Forbidden</h1>;
    if (apiStatus === 404) return <h1>Not Found</h1>;
    else return <h1>Server Error</h1>;
  }

  if(data)
  return (
    <>
      <NavBar />
      <div className="UserProfile">
        <h2>Profile Page</h2>
        <p className="email">Email - {data.user.email}</p>
        <p className="fullname">Full Name - {data.user.fullname}</p>
        <p className="username">Username - {data.user.username}</p>
      </div>
    </>
  );
}

interface DataType{
  user:{
    email: string;
    fullname: string;
    username: string;
  }
}