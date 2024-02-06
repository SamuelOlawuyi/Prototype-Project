import axios from 'axios';
import { phoneNetworks } from './constants';
import { generateRandomToken } from './utils';

/**The Blochq Api class */
class Blochq {
  dataCategoryId: string;
  airtimeCategoryId: string;
  baseUrl: string;
  fakeResponse: boolean;

  constructor() {
    this.dataCategoryId = 'pctg_ftZLPijqrVsTan5Ag7khQx';
    this.airtimeCategoryId = 'pctg_xkf8nz3rFLjbooWzppWBG6';
    this.baseUrl = 'https://api.blochq.io/v1/bills';
    this.fakeResponse = true;
  }

  async getOperators(bill: string) {
    const url = `${this.baseUrl}/operators?bill=${bill}`;
    const authorizationHeaders = { headers: { Authorization: `Bearer ${process.env.BLOCHQ_SECRET}` } }

    try {
      const response = await axios.get(url, authorizationHeaders);
      return response.data.data;

    } catch (error: any) {
      console.error(error);
      throw new Error('Error getting operators');
    }
  }

  async getProducts(operatorID: string, bill: string = 'telco') {
    const url = `${this.baseUrl}/operators/${operatorID}/products?bill=${bill}`;
    const authorizationHeaders = { headers: { Authorization: `Bearer ${process.env.BLOCHQ_SECRET}` } }

    try {
      const response = await axios.get(url, authorizationHeaders);
      return response.data.data;

    } catch (error: any) {
      console.error(error);
      throw new Error('Error getting products');
    }
  }

  async getDataPlans(operatorId: string) {
    try {
      const products = await this.getProducts(operatorId);
      return products
        .filter((product: { category: string }) => product.category === this.dataCategoryId)
        .map((product: { id: string; meta: { fee: string; data_expiry: string; data_value: string }; name: string }) => {
          const { id, meta } = product;
          const { fee, data_value } = meta;
          const dataPlanName = `${data_value} for ${repairKey(meta, 'data_expiry')} at ₦${Number(fee)}`
          return { id, name: dataPlanName, amount: Number(meta.fee) * 100, meta };
        });

    } catch (error) {
      console.error(error);
      throw new Error('Error getting data plans');
    }

    /**Remove extra spaces from an object key */
    function repairKey(obj: { [key: string]: string }, normalKey: string) {
      const trimmedKey = Object.keys(obj).find(key => key.trim() === normalKey);
      return trimmedKey ? obj[trimmedKey] : undefined;
    }
  }

  async verifyNetwork(phone: string, operatorId: string) {
    const phoneNetwork = phoneNetworks[phone.slice(0, 4)]?.toLowerCase();
    const operators = await this.getOperators('telco');
    const operator: { name: string } = operators.find((i: { id: string }) => i.id === operatorId);
    const response = {
      isMatch: phoneNetwork?.includes(operator.name.toLowerCase()),
      selectedOperator: operator.name,
      numberOperator: phoneNetwork,
    }
    return response;
  }

  async buyAirtime(amount: number, operatorId: string, phone: string) {
    try {
      const url = `${this.baseUrl}/payment?bill=telco`;
      const authorizationHeaders = { headers: { Authorization: `Bearer ${process.env.BLOCHQ_SECRET}` } }

      const getAirtimeId = async () => {
        const products = await this.getProducts(operatorId);
        const airtimeProduct = products.find((product: { category: string }) => product.category === this.airtimeCategoryId);
        return airtimeProduct.id;
      }

      const data = {
        amount,
        operator_id: operatorId,
        product_id: await getAirtimeId(),
        device_details: { "beneficiary_msisdn": phone },
      }

      if (this.fakeResponse) {
        const response = { data: { data: { meta_data: { operator_name: await this.getOperatorNameById(data.operator_id) } } } };
        return response.data.data;
      }

      const response = await axios.post(url, data, authorizationHeaders);
      return response.data.data;

    } catch (error: any) {
      console.error(error)
      throw new Error('Error buying airtime');
    }
  }

  async buyData(dataPlanId: string, amount: number, operatorId: string, phone: string) {
    const url = `${this.baseUrl}/payment?bill=telco`;
    const authorizationHeaders = { headers: { Authorization: `Bearer ${process.env.BLOCHQ_SECRET}` } }

    const data = {
      amount,
      operator_id: operatorId,
      product_id: dataPlanId,
      device_details: { "beneficiary_msisdn": phone },
    }

    if (this.fakeResponse) {
      const response = { data: { data: { meta_data: await this.getDataPlanMeta(dataPlanId, operatorId) } } };
      return response.data.data;
    }

    const response = await axios.post(url, data, authorizationHeaders);
    return response.data.data;
  }

  async getDataPlanMeta(dataPlanId: string, operatorId: string) {
    const products = await this.getProducts(operatorId);
    const targetPlan = products.find((product: { id: string }) => product.id === dataPlanId);
    const { data_value, fee } = targetPlan.meta;
    return { data_value, amount: fee * 100, operator_name: await this.getOperatorNameById(operatorId) }
  }

  async getOperatorNameById(operatorId: string, bill: string = 'telco') {
    const operators = await this.getOperators(bill);
    return operators.find((i: { id: string }) => i.id === operatorId).name;
  }

  async validateCustomerDevice(operatorId: string, bill: string, deviceNumber: string, meterType: string = 'prepaid') {
    const url = `${this.baseUrl}/customer/validate/${operatorId}?meter_type=${meterType}&bill=${bill}&device_number=${deviceNumber}`;
    const authorizationHeaders = { headers: { Authorization: `Bearer ${process.env.BLOCHQ_SECRET}` } }
    try {
      const response = await axios.get(url, authorizationHeaders);
      const { address } = response.data.data;
      if (!address)
        return { result: null, error: { message: 'Unable to validate customer' } };

      return { result: response.data.data, error: null };

    } catch (error: any) {
      console.error(error);
      return { result: null, error: { message: error.response.data.message } };
    }
  }

  async buyElectricity(amount: number, operatorId: string, meterNumber: string, meterType: string) {
    const products = await this.getProducts(operatorId, 'electricity');
    const productId = products[0].id;
    const url = `${this.baseUrl}/payment?bill=electricity`;
    const authorizationHeaders = { headers: { Authorization: `Bearer ${process.env.BLOCHQ_SECRET}` } }

    const data = {
      amount,
      operator_id: operatorId,
      product_id: productId,
      device_details: { beneficiary_msisdn: meterNumber, meter_type: meterType },
    }

    if (this.fakeResponse) {
      const units = amount / 7626;
      const response = {
        data: {
          data: {
            meta_data: {
              token: generateRandomToken(),
              units: units.toFixed(1),
              operator_name: await this.getOperatorNameById(operatorId, 'electricity')
            }
          }
        }
      };
      return response.data.data;
    }

    const response = await axios.post(url, data, authorizationHeaders);
    return response.data.data;
  }
}

export const blocApi = new Blochq();