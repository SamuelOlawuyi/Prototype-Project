// shape for user
export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  username: string;
  createdAt: string;
  acctNo: string;
  isAdmin: boolean;
  balance: number;
}

// shape for transaction
export interface ITransaction {
  _id: string;
  amount: number;
  type: 'debit' | 'credit';
  description: string;
  reference: string;
  createdAt: string;
}

// shape for [user, setUser] context
export type OutletContextType = [IUser, React.Dispatch<React.SetStateAction<IUser>>];

export interface IDisco {
  desc: string;
  id: string;
  name: string;
}