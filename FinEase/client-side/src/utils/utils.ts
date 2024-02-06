import Api from "../api.config";
import { ITransaction } from "../types";

// PaystackPop is a global object from paystack.js
declare const PaystackPop: {
  setup: (options: {
    key: string;
    email: string;
    amount: number;
    onClose: () => void;
    callback: (response: { reference: string }) => void;
    ref?: string;
  }) => {
    openIframe: () => void;
  };
};

/** Formats num from kobo to naira. */
export function formatNumber(num: number) {
  num /= 100;
  const formattedNumber = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);

  return formattedNumber;
}

/**Show paystack payment window */
export function payWithPaystack(email: string, amount: number, callback: (response: { reference: string }) => void) {
  const handler = PaystackPop.setup({
    key: import.meta.env.VITE_APP_PAYSTACK_PUBLIC,
    email,
    amount,
    onClose: () => console.log('window closed!'),
    callback
  });
  handler.openIframe();
}

export function formatDateTime(date: string) {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  const hour = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  return `${year}/${month}/${day} ${hour}:${minutes}`;
}

export function greet() {
  const date = new Date();
  const hour = date.getHours();
  if (hour < 12) {
    return 'Good morning';
  } else if (hour < 17) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
}

// get total expense or income for the current month depending on type
export async function getTotalMonthly(type: 'debit' | 'credit'){
  const date = new Date();
  const month = date.getMonth();
  const { data: { transactions } } = await Api.get('/transaction');
  const totalExpense = transactions
    .filter((trx:ITransaction) => {
      const trxDate = new Date(trx.createdAt);
      return trx.type === type && trxDate.getMonth() === month;
    })
    .reduce((acc:number, curr:ITransaction) => acc + curr.amount, 0);
  return totalExpense;
}