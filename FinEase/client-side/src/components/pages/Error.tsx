import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "./onboarding/GetStarted";

export default function Error({ code, message, goto }: IError) {
  const navigate = useNavigate();

  useEffect(() => {
    if (code === 401) {
      navigate('/auth/login');
    }
  })


  return (
    <div id="error-screen">
      <Header />
      <h1>Error {code}</h1>
      <p>{message}</p>
      <Link to={goto}>{goto === '/auth/login' ? 'Login' : 'Home'}</Link>
    </div>
  )
}

interface IError {
  code: number;
  message: string;
  goto: string
}