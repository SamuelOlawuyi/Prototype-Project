import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { IDisco, OutletContextType } from "../../types";
import Api from "../../api.config";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

interface DataInputs {
  operatorId: string;
  meterType: string;
  meterNumber: string;
  amount: string;
}

interface State {
  processing: boolean;
  token: string;
  units: number;
  discos: IDisco[];
  feedback: {
    message: string;
    customer: {
      address: string;
      name: string;
    } | null;
    error: boolean;
    loading: boolean;
  };
  fetchingMessage: string;
}

function ElectricityForm() {
  const [state, setState] = useState<State>({
    processing: false,
    token: '',
    units: 0,
    discos: [],
    feedback: {
      message: '',
      customer: null,
      error: false,
      loading: false,
    },
    fetchingMessage: 'Fetching discos...'
  });
  const { processing, token, units, discos, feedback: { error, message, customer, loading } } = state;
  const [user, setUser] = useOutletContext() as OutletContextType;
  const { register, handleSubmit, watch, reset, setValue } = useForm<DataInputs>();
  const operatorId = watch('operatorId');
  const meterNumber = watch('meterNumber');
  const discoInfo = state.discos.find(disco => disco.id === operatorId)?.desc || '';
  const discoOptions = discos.map((disco: IDisco) => {
    return <option key={disco.id} value={disco.id}>{disco.name}</option>
  });

  useEffect(fetchDiscos, []);

  useEffect(() => {
    setValue('meterType', '');
    setValue('meterNumber', '');
    setState(s => ({ ...s, feedback: { ...s.feedback, customer: null } }));
  }, [operatorId, setValue]);

  function fetchDiscos() {
    setState(s => ({ ...s, feedback: { ...s.feedback, message: 'Fetching discos...', loading: true } }));
    Api.get('transaction/discos')
      .then(res => {
        setState(s => ({ ...s, fetchingMessage: '', discos: res.data.discos, feedback: { ...s.feedback, customer: null, message: '', loading:false } }));
      })
      .catch(() => {
        setState(s => ({ ...s, fetchingMessage: 'Service unavailable. Please try again later.', feedback: { ...s.feedback, message: 'Error fetching discos', error: true, loading:false } }));
      });
  }

  function confirmUser() {
    if (!meterNumber) {
      setState(s => ({ ...s, feedback: { ...s.feedback, message: 'Meter number is required!', error: true } }));
      return;
    }
    setState(s => ({ ...s, feedback: { ...s.feedback, message: 'Validating customer info. Please wait...', error: false, loading:true } }));
    Api.get(`transaction/customer-validate/${operatorId}?bill=electricity&deviceNumber=${meterNumber}`)
      .then(res => {
        const { address, name } = res.data.customer;
        setState(s => ({ ...s, feedback: { ...s.feedback, message: '', customer: { address, name }, loading: false } }));
      })
      .catch((err) => {
        setState(s => ({ ...s, feedback: { ...s.feedback, message: err.response.data.message, error: true, loading: false } }));
      });
  }

  function buyElectricity(amount: string, operatorId: string, meterType: string, meterNumber: string) {
    Api.post('transaction/electricity', { amount, operatorId, meterType, meterNumber })
      .then((res) => {
        const { message, units, token } = res.data;
        toast.success(message);
        setState(s => ({ ...s, token, units, processing: false }));
        setUser({ ...user, balance: res.data.balance });
        reset();
      })
      .catch(err => {
        toast.error(err.response.data.message);
        setState(s => ({ ...s, processing: false }));
      });
  }

  function onSubmit(data: DataInputs) {
    const { amount, meterNumber, meterType, operatorId } = data;
    setState(s => ({ ...s, processing: true }));
    buyElectricity(amount, operatorId, meterType, meterNumber);
  }

  return (
    <div id="electricity-recharge">
      <h2>Electricity</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className={`${token ? '' : 'hidden'} alert alert-success alert-dismissible fade show`} role="alert">
          <strong>Transaction successful.</strong> Electricity token: {token}. Units: {units}.
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <div className="input-group mb-3">
          <div className="form-floating">
            <select {...register('operatorId')} className="form-control" id="disco" required>
              <option value=""> -- SELECT DISCO -- </option>
              {discoOptions}
            </select>
            <label htmlFor="disco">Disco</label>
          </div>
        </div>
        <div className="input-group mb-3">
          <div className="form-floating">
            <select {...register('meterType')} className="form-control" id="meter-type" required>
              <option value=""> -- SELECT METER TYPE -- </option>
              <option value="prepaid">Prepaid</option>
              <option value="postpaid">Postpaid</option>
            </select>
            <label htmlFor="meter-type">Meter Type</label>
          </div>
        </div>
        <div className="input-group mb-3">
          <div className="form-floating">
            <input {...register('meterNumber')} disabled={!operatorId} className="form-control" type="number" id="meter-number" placeholder="Enter customer meter number" required onBlur={confirmUser} />
            <label htmlFor="meter-number">Meter Number</label>
          </div>
        </div>

        <div className="input-group mb-3">
          <div className="form-floating">
            <input {...register('amount')} className="form-control" type="number" id="amount" placeholder="Enter amount in Naira" required />
            <label htmlFor="amount">Amount</label>
          </div>
        </div>
        <button className="btn btn-danger w-100" disabled={processing || loading}>{processing ? 'Transaction processing! Please wait...' : 'Proceed'}</button>
      </form>
      {state.fetchingMessage && <i className="text-danger">{state.fetchingMessage}</i>}

      {discoInfo && <div className="details">
        <div className="my-4 bg-info-subtle">
          <p>{discoInfo}</p>
          {message && <i className={`text-${error ? 'danger' : 'primary'}`}>{message}</i>}
          {(customer && !message) && (
            <div>
              <p>Name: {customer.name}</p>
              <p>Address: {customer.address}</p>
            </div>
          )}
        </div>
      </div>}
    </div>
  );
}

export default ElectricityForm;