import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../../api.config";
import { toast } from "react-toastify";

interface SignupInputs {
  username: string;
  first: string;
  last: string;
  email: string;
  phone: string;
  password: string;
  confirm: string;
  adminKey?: string;
}

export default function Signup({ admin }: { admin: boolean }) {
  interface IState {
    // emailErrorFeedback: string;
    // usernameErrorFeedback: string;
    loading: boolean;
  }

  const [state, setState] = useState<IState>({
    // emailErrorFeedback: "",
    // usernameErrorFeedback: "",
    loading: false,
  });

  const { register, handleSubmit, setValue } = useForm<SignupInputs>();
  const { loading } = state;
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'FinEase - Signup'
  });

  function onSubmit(data: SignupInputs) {
    const { username, first, last, email, phone, password, confirm, adminKey } = data;
    const endpoint = admin
      ? { url: "/auth/admin-signup", inputs: { username, first, last, email, phone, password, confirm, adminKey } }
      : { url: "/auth/signup", inputs: { username, first, last, email, phone, password, confirm } };

    const { url, inputs } = endpoint;

    setState((s) => ({ ...s, loading: true }));
    signup(url, inputs);

    function signup(url: string, inputs: SignupInputs) {
      Api.post(url, inputs)
        .then((res) => {
          toast.success(res.data.message);
          navigate('/auth/login');
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
  }

    /**Prevent user from entering a space on the target input element.
   * Should be used on the onKeyUp event
  */
    function preventSpace(e: React.KeyboardEvent<HTMLInputElement>) {
      const { value, name } = e.currentTarget;
      if (value.split(' ').length > 1) {
        setValue(name as 'first' | 'last' | 'username', value.split(' ').join(''));
      }
    }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-group mb-3">
        <div className={`form-floating`}>
          <input onKeyUp={preventSpace} {...register('first')} className="form-control" type="text" id="first" placeholder="First Name" required />
          <label htmlFor="first">First Name</label>
        </div>
      </div>

      <div className="input-group mb-3">
        <div className={`form-floating`}>
          <input onKeyUp={preventSpace} {...register('last')} className="form-control" type="text" id="last" placeholder="Last Name" required />
          <label htmlFor="last">Last Name</label>
        </div>
      </div>

      <div className="input-group mb-3">
        <div className='form-floating'>
          {/* {emailErrorFeedback && (
          <em className="feedback">{emailErrorFeedback}</em>
        )} */}
          <input {...register('email')} className="form-control" type="email" id="email" placeholder="Email" required />
          <label htmlFor="email">Email</label>
        </div>
        <p className="invalid-feedback">error feedback</p>
      </div>

      <div className="input-group mb-3">
        <div className='form-floating'>
          <input {...register('phone')} className="form-control" minLength={11} maxLength={11} type="tel" id="phone" placeholder="Phone Number" required />
          <label htmlFor="phone">Phone Number</label>
        </div>
      </div>

      <div className="input-group mb-3">
        <div className='form-floating'>
          {/* {usernameErrorFeedback && (
          <em className="feedback">{usernameErrorFeedback}</em>
        )} */}
          <input onKeyDown={preventSpace} {...register('username')} className="form-control" id="username" placeholder="Username" required />
          <label htmlFor="username">Username</label>
        </div>
        <p className="invalid-feedback">error message</p>
      </div>

      <div className="input-group mb-3">
        <div className='form-floating'>
          <input {...register('password')} className="form-control" type="password" id="password" placeholder="Password" required />
          <label htmlFor="password">Password</label>
        </div>
      </div>

      <div className="input-group mb-3">
        <div className='form-floating'>
          <input {...register('confirm')} type="password" id="confirm" placeholder="Confirm Password" className="form-control" required />
          <label htmlFor="confirm">Confirm Password</label>
        </div>
      </div>

      {admin && (
        <div className="input-group mb-3">
          <div className='form-floating'>
            <input {...register('adminKey')} className="form-control" type="password" id="admin-key" placeholder="Admin Key" required />
            <label htmlFor="admin-key">Admin Key</label>
          </div>
        </div>
      )}
      <div>
      <button className="btn btn-primary w-100" type="submit" disabled={loading}>
          {loading ? <>
            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <span role="status">Preparing your account... Please wait</span>
          </> : "Login"}
        </button>
      </div>

      <p className="my-2 text-center">
        Already have an account? <Link to={'/auth/login'}>Log In</Link>
      </p>
    </form>
  );
}