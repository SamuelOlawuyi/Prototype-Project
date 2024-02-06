import { useOutletContext } from "react-router-dom";
import { OutletContextType } from "../../types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Api from "../../api.config";
import { networkLogo, phoneNumberRegex } from "../../utils/constants";
import { useForm } from "react-hook-form";

interface DataInputs {
  operatorId: string;
  phone: string;
  amount: number;
}

function AirtimeForm() {
  const [state, setState] = useState<IState>({
    networks: [],
    processing: false,
    logoUrl: '',
    errorFeedback: 'Fetching networks...',
  });
  const [user, setUser] = useOutletContext() as OutletContextType;
  const { register, reset, watch, handleSubmit } = useForm<DataInputs>();
  const options = state.networks.map(network => {
    return <option key={network.id} value={network.id}>{network.name}</option>
  });

  useEffect(fetchNetworks, []);

  function fetchNetworks() {
    Api.get('transaction/networks')
      .then(res => {
        const { networks } = res.data
        setState(s => ({ ...s, networks, errorFeedback: '' }));
      })
      .catch(() => {
        setState(s => ({ ...s, errorFeedback: 'Service unavailable. Please try again later.' }));
      });
  }

  const phone = watch('phone');

  function buyAirtime(operatorId: string, amount: number, phone: string) {
    Api.post('transaction/airtime', { operatorId, amount, phone })
      .then(res => {
        toast.success(res.data.message);
        setState(s => ({ ...s, processing: false, logoUrl: '' }));
        setUser({ ...user, balance: res.data.balance });
        reset();
      })
      .catch(err => {
        toast.error(err.response.data.message);
        setState(s => ({ ...s, processing: false }));
      });
  }

  function determineNetwork() {
    if (!phoneNumberRegex.test(phone)) {
      setState(s => ({ ...s, logoUrl: '' }));
      return;
    }
    Api.get(`transaction/phone-network?phone=${phone}`)
      .then(res => {
        const network = res.data.network.toLowerCase() as string;
        setState(s => ({ ...s, logoUrl: networkLogo[network] }));
      })
      .catch(() => {
        setState(s => ({ ...s, logoUrl: '' }));
      });
  }

  function onSubmit(data: DataInputs) {
    const { operatorId, amount, phone } = data;
    setState(s => ({ ...s, processing: true }));
    buyAirtime(operatorId, amount, phone);
  }

  return (
    <div>
      <h2>Airtime</h2>
      <form onBlur={determineNetwork} className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mb-3">
          <div className="form-floating">
            <select {...register('operatorId')} className="form-control" required id="network">
              <option value="">-- SELECT NETWORK --</option>
              {options}
            </select>
            <label htmlFor="network">Network</label>
          </div>
        </div>

        <div className="input-group mb-3">
          <div className="form-floating">
            <input {...register('phone')} className="form-control" type="tel" maxLength={11} required id="phone" placeholder="Phone Number" pattern={phoneNumberRegex.source} />
            <label htmlFor="phone">Phone Number</label>
          </div>
          {state.logoUrl && <img className="small-network-logo" src={state.logoUrl} style={{ width: '40px' }} />}
        </div>

        <div className="input-group mb-3">
          <div className="form-floating">
            <input {...register('amount')} className="form-control" min={1} required autoComplete="off" type="number" id="amount" placeholder="50" />
            <label htmlFor="amount">Amount</label>
          </div>
        </div>
        <button className="w-100 btn btn-success" disabled={state.processing}>{state.processing ? 'Transaction processing! Please wait...' : 'Proceed'}</button>
      </form>
      {state.errorFeedback && <i className="text-danger">{state.errorFeedback}</i>}
    </div>
  );

  interface IState {
    networks: {
      id: string;
      name: string;
    }[];
    processing: boolean;
    logoUrl: string;
    errorFeedback: string;
  }
}

export default AirtimeForm;

// 133 lines of code reduced to 116 lines!