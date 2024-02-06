import myApi, { apiBaseUrl } from "../../api.config";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";
import Logo from "../../assets/images/Blogger-logo1.png";
import "./Auth.css";

export default function Signup() {
  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    username: "",
    fullname: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);

  const [apiStatus, setApiStatus] = useState<number | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    myApi
      .get("/auth/signup")
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
  }, []);

  if (loading) return <Loading />;

  if (apiStatus !== undefined && apiStatus !== 200) {
    // Handle API error
    if (apiStatus === 401) return <h1>Unauthorized</h1>;
    if (apiStatus === 403) return <h1>Forbidden</h1>;
    if (apiStatus === 404) return <h1>Not Found</h1>;
    else return <h1>Server Error</h1>;
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    myApi
      .post("/auth/signup", formData)
      .then((response) => {
        alert(response.data.msg);
        navigate("/login");
      })
      .catch((err) => {
        alert(err.response.data);
        navigate("/signup");
      });
  }

  return (
    <div className="Auth">
      <Link to="/">
        <img src={Logo} alt="decablog logo" />
      </Link>
      <form onSubmit={handleSubmit}>
        <h2>Sign up your account</h2>
        <input
          type="email"
          name="email"
          id="email"
          required
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="username"
          id="username"
          required
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="text"
          name="fullname"
          id="fullname"
          required
          placeholder="Full Name"
          value={formData.fullname}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          id="password"
          required
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button className="btn green">Create Account</button>
        <a className="google-btn" href={`${apiBaseUrl}/auth/google`}>
          <button className="btn google" type="button">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
            <span>Google</span>
          </button>
        </a>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}

interface SignupFormData {
  email: string;
  username: string;
  fullname: string;
  password: string;
}
