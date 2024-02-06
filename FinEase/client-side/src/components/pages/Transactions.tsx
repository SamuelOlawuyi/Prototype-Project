import React, { useEffect, useState } from "react";
import Api from "../../api.config";
import Error from "./Error";
import { formatDateTime, formatNumber } from "../../utils/utils";
import Loading from "./Loading";
import { ITransaction } from "../../types";

export default function Transactions() {
  const [state, setState] = useState<IStatus>({
    transactions: [],
    apiStatus: 'loading',
    error: { status: 0, statusText: '', goto: '/' },
    searchTerm: '',
    searchResults: []
  });

  const { apiStatus, error, searchTerm, searchResults } = state;

  useEffect(getTransactions, []);

  function getTransactions() {
    Api.get('/transaction')
      .then(res => {
        const { transactions } = res.data;
        setState(s => ({ ...s, apiStatus: 'success', transactions, searchResults: transactions }));
      })
      .catch(err => {
        const { status, statusText } = err.response;
        setState(s => ({ ...s, status: 'error', error: { ...s.error, status, statusText } }));
      });
  }

  useEffect(() => {
    setState(s => ({ ...s, searchResults: s.transactions }));
  }, []);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const text = e.target.value;
    setState(s => ({
      ...s,
      searchTerm: text,
      searchResults: s.transactions.filter(trx => {
        const searchPool = [
          trx.amount,
          trx.type,
          trx.description.toLowerCase(),
          trx.reference.toLowerCase(),
        ];
        return searchPool.some(item => item.toString().includes(text.toLowerCase().trim()));
      })
    }));
  }

  if (apiStatus === 'success') {
    return (
      <section id="all-transactions">
        <h1>Transactions</h1>
        <input value={searchTerm} onChange={handleSearch} type="search" placeholder="Search transaction..." />
        <hr />
        <div className="table">

        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Amount</th>
                <th>Type</th>
                <th className="table-desc">Description</th>
                <th>Reference</th>
                <th style={{width: '130px'}}>Date</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.length
                ? searchResults.map((trx: ITransaction, index: number) => (
                  <tr key={trx._id}>
                    <td>{index + 1}</td>
                    <td>{formatNumber(+trx.amount).slice(3)}</td>
                    <td>{trx.type}</td>
                    <td>{trx.description}</td>
                    <td>{trx.reference}</td>
                    <td>{formatDateTime(trx.createdAt)}</td>
                  </tr>
                ))
                : <tr><td colSpan={6}>No transactions found</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    )
  }

  if (apiStatus === 'error') {
    return <Error code={error.status} message={error.statusText} goto={error.goto} />
  }

  return <Loading />

  interface IStatus {
    transactions: ITransaction[];
    apiStatus: 'loading' | 'success' | 'error';
    error: {
      status: number;
      statusText: string;
      goto: string;
    };
    searchTerm: string;
    searchResults: ITransaction[];
  }
}