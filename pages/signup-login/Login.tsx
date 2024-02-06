import myApi, { apiBaseUrl } from "../../api.config";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";
import Logo from "../../assets/images/Blogger-logo1.png";
import "./Auth.css";

export default function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState<number | undefined>(undefined);

  useEffect(() => {
    myApi
      .get("/auth/login")
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
      .post("/auth/login", formData)
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem("token", token);
        navigate("/stories");
        alert("Login successfully")
      })
      .catch((err) => {
        alert(err.response.data)
        navigate("/login");
      });
  }

  return (
    <div className="Auth">
      <Link to="/">
        <img src={Logo} alt="decablog logo" />
      </Link>

      <form className="Auth" onSubmit={handleSubmit}>
        <h2>Login to your account</h2>
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
          type="password"
          name="password"
          id="password"
          required
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button className="btn green">Login</button>
        <a className="google-btn" href={`${apiBaseUrl}/auth/google`}>
          <button className="btn google" type="button">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
            <span>Google</span>
          </button>
        </a>
        <p>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </form>
    </div>
  );
}

interface LoginFormData {
  email: string;
  password: string;
}
