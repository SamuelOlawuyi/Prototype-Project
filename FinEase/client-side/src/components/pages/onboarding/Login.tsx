import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../../api.config";
import { toast } from "react-toastify";

interface LoginInputs {
  username_email: string;
  password: string;
}

export function Login() {
  const [state, setState] = useState({
    loading: false,
  });

  const { register, handleSubmit } = useForm<LoginInputs>();

  const { loading } = state;
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'FinEase - Login';
  });

  function onSubmit(data: LoginInputs) {
    const { username_email, password } = data;
    function login() {
      Api.post("/auth/login", { emailOrUsername: username_email, password })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          navigate("/account/dashboard");
          setState((s) => ({ ...s, loading: false }));
        })
        .catch((err) => {
          if (err.response) {
            toast.error(err.response.data.message);
          } else {
            toast.error(err.message);
          }
          setState((s) => ({ ...s, loading: false }));
        });
    }

    setState((s) => ({ ...s, loading: true }));
    login();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-floating">
        <input {...register('username_email')} className="form-control mb-3" id="username_email" placeholder="Email or Username" required />
        <label htmlFor="username_email">Email or Username</label>
      </div>
      <div className="form-floating mb-3">
        <input {...register('password')} className="form-control" id="password" type="password" placeholder="Password" required />
        <label htmlFor="password">Password</label>
      </div>
      <div>
        <button className="btn btn-primary w-100" type="submit" disabled={loading}>
          {loading ? <>
            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <span role="status">Logging in... Please wait</span>
          </> : "Login"}
        </button>
      </div>

      <div className="my-2">
        <Link to="/auth/forgot-password">Forgot Password?</Link>
      </div>

      <p className="my-2 text-center">
        Don't have an account? <Link to='/auth/signup'>Sign Up</Link>
      </p>
    </form>
  );
}