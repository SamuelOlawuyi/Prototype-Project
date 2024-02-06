import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Auth() {
  return (
    <div className="get-started">
      <Header />
      <div className="form-container">
        <FormNav />
        <Outlet />
      </div>
    </div>
  );
}

function FormNav() {
  const [active, setActive] = useState("");
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/auth/login') {
      setActive('/auth/login');
    } else {
      setActive('/auth/signup');
    }
  }, [location.pathname]);

  return (
    <ul className="nav nav-tabs">
      <li className='nav-item'>
        <Link to='/auth/signup' className={`nav-link ${active === '/auth/signup' ? "active" : ""}`}>Signup</Link>
      </li>
      <li className="nav-item">
        <Link to='/auth/login' className={`nav-link ${active === '/auth/login' ? "active" : ""}`}>Login</Link>
      </li>
    </ul>
  );
}

export function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <div className="container">
        <Link to='/' className="navbar-brand" >FinEase</Link>
      </div>
    </nav>
  );
}
