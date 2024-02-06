import Api from "../../api.config";
import { useState, useEffect } from "react";
// import { FaSort } from "react-icons/fa";
import { IUser } from "../../types";
import Error from "./Error";

export default function UsersList() {
  interface IState {
    users: IUser[];
    apiStatus: 'loading' | 'success' | 'error';
    searchTerm: string;
    searchResults: IUser[];
    error: {
      status: number;
      statusText: string;
      goto: string;
    }
  }

  const [state, setState] = useState<IState>({
    users: [],
    apiStatus: 'loading',
    searchTerm: '',
    searchResults: [],
    error: { status: 0, statusText: '', goto: '/' }
  });

  const { apiStatus, searchTerm, searchResults, error } = state;

  function fetchUsers() {
    Api.get('/account/all-users')
      .then(res => {
        setState(s => ({ ...s, apiStatus: 'success', users: res.data.users, searchResults: res.data.users }));
      })
      .catch(err => {
        console.error(err.message);
        setState(s => ({ ...s, apiStatus: 'error' }));
        if (err.response) {
          const { status, statusText } = err.response;
          setState(s => ({
            ...s,
            error: {
              ...s.error,
              status,
              statusText,
              goto: status >= 400 && status <= 499 ? '/auth/login' : s.error.goto
            }
          }));
        } else {
          setState(s => ({ ...s, error: { ...s.error, status: 500, statusText: err.message } }));
        }
      });
  }

  useEffect(fetchUsers, []);
  useEffect(() => {
    setState(s => ({ ...s, searchResults: s.users }));
  }, []);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const text = e.target.value;
    setState(s => ({
      ...s,
      searchTerm: text,
      searchResults: s.users.filter(user => {
        const { fullName, email, phone, acctNo } = user;
        const searchPool = [
          fullName.toLowerCase(),
          email.toLowerCase(),
          phone.toLowerCase(),
          acctNo.toLowerCase()
        ];
        return searchPool.some(item => item.includes(text.toLowerCase().trim()));
      })
    }));
  }

  if (apiStatus === 'success') {
    return (
      <section id="admin">
        <h1>List of all active users of FinEase</h1>
        <input type="search" placeholder="Search for user..." onChange={handleSearch} value={searchTerm} />
        <hr />
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th><span>Name</span></th>
                <th><span>Username</span></th>
                <th><span>Email</span></th>
                <th><span>Phone</span></th>
                <th><span>Date Registered</span></th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((user: IUser, index: number) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.fullName}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.createdAt.split('T')[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  if (apiStatus === 'error') {
    return (
      <Error code={error.status} message={error.statusText} goto={error.goto} />
    );
  }
}