import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  useEffect(() => {
    document.title = "FinEase - Home";
  });

  const copyrightDate = new Date();

  return (
    <div id="homepage">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to='/' className="navbar-brand" >FinEase</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`${'collapse'} navbar-collapse`} id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item"><a className="nav-link" href="#features">Features</a></li>
              <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
              <li className="nav-item"><Link className="nav-link" to="/account/recharge">Recharge Now</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero text-center mb-5 mt-4">
        <div className="container">
          <h2>Welcome to FinEase</h2>
          <p>Your one-stop solution for buying airtime, data, and paying bills.</p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/auth/login" className="btn btn-primary">Login</Link>
            <Link to="/auth/signup" className="btn btn-primary">Signup</Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="features text-center my-5">
        <div className="container">
          <h2>Key Features</h2>
          <div className="row">
            <div className="col-md-4">
              <img src="https://www.firstbit.com.ng/imgs/Fisrtsbit-01.png" alt="Airtime" className="img-fluid" />
              <h3>Buy Airtime</h3>
              <p>Top up your mobile phone with ease using FinEase.</p>
            </div>
            <div className="col-md-4">
              <img src="https://ebills.ng/wp-content/uploads/2021/10/Data.jpg" alt="Data" className="img-fluid" />
              <h3>Buy Data</h3>
              <p>Stay connected by purchasing data plans at your convenience.</p>
            </div>
            <div className="col-md-4">
              <img src="https://prestmit.com/blog/wp-content/uploads/2023/04/IMG-20230425-WA0000.jpg" alt="Bills" className="img-fluid" />
              <h3>Pay Bills</h3>
              <p>Effortlessly pay your bills and manage your finances.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section id="download" className="download text-center my-5">
        <div className="container">
          <h2>Create An Account Now</h2>
          <p>Experience the convenience of managing your finances on the go.</p>
          <Link to="/auth/signup" className="btn btn-primary">Get Started</Link>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact text-center">
        <div className="container">
          <h2>Contact Us</h2>
          <p>Have questions or feedback? Reach out to us!</p>
          <p>ikilodesmond@gmail.com</p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer text-center">
        <div className="container">
          <p>&copy; {copyrightDate.getFullYear()} FinEase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}