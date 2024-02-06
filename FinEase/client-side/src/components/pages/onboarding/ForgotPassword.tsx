import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Api from "../../../api.config";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [state, setState] = useState({
    loading: false,
  });

  const { register, handleSubmit } = useForm<{ email: string }>();

  const { loading } = state;
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'FinEase - Reset Password';
  });

  function onSubmit(data: { email: string }) {
    const { email } = data;
    function sendOtp() {
      Api.post("/auth/forgot-password", { email })
        .then(() => {
          navigate("/auth/reset-password");
          toast.info("Check your email for the reset OTP", {autoClose: false});
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
    sendOtp();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-floating">
        <input {...register('email')} className="form-control mb-3" id="email" placeholder="Email" required />
        <label htmlFor="email">Email</label>
      </div>
      <div>
        <button className="btn btn-primary w-100" type="submit" disabled={loading}>
          {loading ? <>
            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <span role="status">Sending... Please wait</span>
          </> : "Send Reset OTP to Email"}
        </button>
      </div>

    </form>
  );
}