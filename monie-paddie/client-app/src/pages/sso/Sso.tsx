import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Sso() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") as string;
  localStorage.setItem("token", token);

  useEffect(() => {
    if (token) {
      console.log('login successful...')
      navigate("/dashboard");
    } else {
      console.log('loging not successful...')
      navigate("/login");
    }
  }, [token, navigate]);

  return <p>Loading...</p>;
}
