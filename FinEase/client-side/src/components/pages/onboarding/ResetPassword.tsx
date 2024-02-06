import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Api from "../../../api.config";
import { toast } from "react-toastify";

interface DataType {
  email: string;
  password: string;
  confirm: string;
  otp: string;
}

export function ResetPassword() {
  const [state, setState] = useState({
    loading: false,
  });

  const { register, handleSubmit } = useForm<DataType>();

  const { loading } = state;
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'FinEase - Reset Password';
  });

  function onSubmit(data: DataType) {
    const { email, password, confirm, otp } = data;
    function reset() {
      Api.post("/auth/reset-password", { email, password, confirm, otp })
        .then(() => {
          navigate("/auth/login");
          toast.success("Password reset successful");
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
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-floating">
        <input {...register('email')} type="email" className="form-control mb-3" id="email" placeholder="Email" required />
        <label htmlFor="email">Email</label>
      </div>
      <div className="form-floating mb-3">
        <input {...register('password')} className="form-control" id="password" type="password" placeholder="Password" required />
        <label htmlFor="password">Password</label>
      </div>
      <div className="form-floating mb-3">
        <input {...register('confirm')} className="form-control" id="confirm" type="password" placeholder="Confirm Password" required />
        <label htmlFor="confirm">Password</label>
      </div>
      <div className="form-floating mb-3">
        <input {...register('otp')} className="form-control" id="otp" placeholder="OTP" required />
        <label htmlFor="otp">OTP</label>
      </div>
      <div>
        <button className="btn btn-primary w-100" type="submit" disabled={loading}>
          {loading ? <>
            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <span role="status">Submitting... Please wait</span>
          </> : "Submit"}
        </button>
      </div>
    </form>
  );
}