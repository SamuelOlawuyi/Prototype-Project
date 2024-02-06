import { useEffect, useState } from "react";
import { formatDateTime, formatNumber, getTotalMonthly, greet } from "../../utils/utils";
import { useOutletContext } from "react-router-dom";
import { ITransaction, IUser } from "../../types";
import Api from "../../api.config";
import { IoWalletOutline } from "react-icons/io5";
import { GiExpense } from "react-icons/gi";
import FormModal from "../modals/FormModal";
import TransferWallet from "../modals/TransferWallet";
import { FundWalletModal } from "../modals/FundWallet";

export default function Dashboard() {
  interface IState {
    balance: number;
    recent10: ITransaction[];
    modal: {
      fundWallet: boolean;
      transferWallet: boolean;
    },
    totalExpense: number;
  }
  const [user] = useOutletContext() as [IUser];

  const [state, setState] = useState<IState>({
    balance: 0,
    recent10: [],
    modal: {
      fundWallet: false,
      transferWallet: false,
    },
    totalExpense: 0,
  });

  const { balance, recent10, totalExpense } = state;

  useEffect(getRecentTransactions, []);

  useEffect(() => {
    setState(s => ({ ...s, balance: user.balance }));
  }, [user.balance]);

  useEffect(() => {
    getTotalMonthly('debit')
      .then(res => {
        setState(s => ({ ...s, totalExpense: res }));
      })
      .catch(err => {
        console.error(err.response.data);
      })
  }, [balance]);

  function getRecentTransactions() {
    Api.get(`transaction?limit=${10}`)
      .then(res => {
        setState(s => ({ ...s, recent10: res.data.transactions }));
      })
      .catch(err => {
        console.error(err.response.data);
      })
  }

  function toggleModal(modal: 'fundWallet' | 'transferWallet') {
    setState(s => ({ ...s, modal: { ...s.modal, [modal]: !state.modal[modal] } }));
  }

  return (
    <div id="dashboard">
      <div className="message">
        <h2>{greet()} {user.fullName.split(' ')[0]}!</h2>
      </div>
      <section>
        <div className="cards mb-3">
          <div className="bg-danger text-white">
            <h2>{formatNumber(balance)}</h2>
            <p>Current Wallet Balance</p>
            <div className="wallet-icon">
              <IoWalletOutline />
            </div>
          </div>
          <div className="text-white bg-facebook">
            <h2>{formatNumber(totalExpense)}</h2>
            <p>Total Monthly Expense</p>
            <div className="wallet-icon">
              <GiExpense />
            </div>
          </div>
        </div>

        <div className="d-flex mb-3 gap-3">
          <button onClick={() => toggleModal('fundWallet')} className="btn btn-success" data-bs-toggle="modal" data-bs-target="#fundWallet">Load Wallet</button>
          <button onClick={() => toggleModal('transferWallet')} className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#transferWallet">Transfer Funds</button>
        </div>
      </section>

      <section>
        <div className="header">Recent Transactions</div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>SN</th>
                <th>Type</th>
                <th>Amount</th>
                <th className="table-desc">Description</th>
                <th style={{width: '130px'}}>Time</th>
              </tr>
            </thead>
            <tbody>
              {recent10.map((trx: ITransaction, index: number) => (
                <tr key={trx._id}>
                  <td>{index + 1}</td>
                  <td>{trx.type}</td>
                  <td>{formatNumber(+trx.amount).slice(3)}</td>
                  <td>{trx.description}</td>
                  <td>{formatDateTime(trx.createdAt)}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </section>

      <FormModal closeModal={() => toggleModal('transferWallet')} id='transferWallet' title="Wallet to Wallet Transfer">
        <TransferWallet onSuccess={getRecentTransactions} closeModal={() => toggleModal('transferWallet')} />
      </FormModal>
      <FormModal closeModal={() => toggleModal('fundWallet')} id='fundWallet' title="Fund Wallet">
        <FundWalletModal onSuccess={getRecentTransactions} closeModal={() => toggleModal('fundWallet')} />
      </FormModal>

      <div className=" disclaimer p-2 bg-primary-subtle text-dark mt-3">
        <em>Disclaimer: This app is for demonstration purpose. No real money is funded and no real value is gotten for successful recharges and bills payments.</em>
      </div>
    </div>
  )
}