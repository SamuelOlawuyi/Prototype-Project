import { useOutletContext } from "react-router-dom";
import { IUser } from "../../types";

export default function Profile() {
  const [user] = useOutletContext() as [IUser];

  return (
    <div id="user-profile">
      <h1>Account Info</h1>
      <hr />
      <div>
        <p><b>Name: </b><i>{user.fullName} <b style={{ color: 'darkblue' }}>{user.isAdmin && '(Admin)'}</b></i></p>
        <p><b>Email: </b><i>{user.email}</i></p>
        <p><b>Phone: </b><i>{user.phone}</i></p>
        <p><b>Wallet Account Number: </b><i>{user.acctNo}</i></p>
        <p><b>Date Registered: </b><i>{user.createdAt.split('T')[0]}</i></p>
      </div>
    </div>
  )
}