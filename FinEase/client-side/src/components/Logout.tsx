import { useNavigate } from "react-router-dom";
import Api from "../api.config";
import { useEffect } from "react";

export function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    Api.post('/auth/logout')
      .then(() => {
        console.info('info: logged out successfully');
      })
      .catch(() => {
        console.warn('warning: did not logout successfully');
      })
      .finally(() => navigate('/auth/login'));
  })

  return null;
}