// export default function NoPage() {
//     return (
//         <>
//         <h2>Error 404: Not found</h2>
//         </>
//     )
// }
// import React from 'react';
import './NoPage.css'; 

export default function NoPage() {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-heading">404</h1>
        <p className="error-message">Oops! Page not found</p>
        <p className="error-description">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <a href="/" className="error-link">
          Go back to homepage
        </a>
      </div>
    </div>
  );
}
