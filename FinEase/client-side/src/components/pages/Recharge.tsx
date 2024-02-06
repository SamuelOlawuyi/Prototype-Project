import { useState } from "react";
import AirtimeForm from "../recharge/AirtimeForm";
import DataForm from "../recharge/DataForm";
import ElectricityForm from "../recharge/ElectricityForm";
import Tv from "../recharge/TvForm";

export default function Recharge() {
  const [state, setState] = useState({
    service: '',
  });
  const { service } = state;

  function handleServiceChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setState(s => ({ ...s, service: e.target.value }));
  }

  return (
    <section id="recharge">
      <h1>Recharge</h1>
      <form className="mb-4">
        <label htmlFor="service">What do you want to do?</label>
        <select id="service" value={service} onChange={handleServiceChange}>
          <option value='' >--select--</option>
          <option value="airtime">Buy Airtime</option>
          <option value="data">Buy Data</option>
          <option value="electricity">Buy Electricity</option>
          <option value="tv">Tv Subscription</option>
        </select>
      </form>

      {service === 'airtime' && <AirtimeForm />}
      {service === 'data' && <DataForm />}
      {service === 'electricity' && <ElectricityForm />}
      {service === 'tv' && <Tv />}
    </section>
  )
}
