import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loading from "./loading/Loading";

export default function Sso() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") as string;
  localStorage.setItem("token", token);

  useEffect(() => {
    if (token) {
      navigate("/stories");
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  return <Loading />;
}
