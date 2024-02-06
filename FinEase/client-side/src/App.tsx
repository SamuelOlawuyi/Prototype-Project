import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/pages/Home'
import Profile from './components/pages/Profile'
import Dashboard from './components/pages/Dashboard';
import Error from './components/pages/Error';
import AllUsers from './components/pages/AllUsers';
import Auth from './components/pages/onboarding/GetStarted';
import Signup from './components/pages/onboarding/Signup';
import Transactions from './components/pages/Transactions';
import Recharge from './components/pages/Recharge';
import Settings from './components/pages/Settings';
import Account from './components/Account';
import { Login } from './components/pages/onboarding/Login';
import { Logout } from './components/Logout';
import ForgotPassword from './components/pages/onboarding/ForgotPassword';
import { ResetPassword } from './components/pages/onboarding/ResetPassword';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/auth' element={<Auth />}>
          <Route path='signup' element={<Signup admin={false} />} />
          <Route path='admin-signup' element={<Signup admin={true} />} />
          <Route path='login' element={<Login />} />
          <Route path='logout' element={<Logout />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='reset-password' element={<ResetPassword />} />
        </Route>
        <Route path='/account' element={<Account />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='profile' element={<Profile />} />
          <Route path='all-users' element={<AllUsers />} />
          <Route path='transactions' element={<Transactions />} />
          <Route path='recharge' element={<Recharge />} />
          <Route path='settings' element={<Settings />} />
        </Route>
        <Route path='*' element={<Error message={'Page Not Found'} code={404} goto={'/'} />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}