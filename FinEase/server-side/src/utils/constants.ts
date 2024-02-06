import dotenv from 'dotenv';

dotenv.config();

export const phoneNetworks: { [key: string]: string } = {
  "0701": "Airtel",
  "0702": "MTN",
  "0703": "MTN",
  "0704": "MTN",
  "0705": "Globacom",
  "0706": "MTN",
  "0708": "Airtel",

  "0802": "Airtel",
  "0803": "MTN",
  "0805": "Globacom",
  "0806": "MTN",
  "0807": "Globacom",
  "0808": "Airtel",
  "0809": "9mobile",

  "0810": "MTN",
  "0811": "Globacom",
  "0812": "Airtel",
  "0813": "MTN",
  "0814": "MTN",
  "0815": "Globacom",
  "0816": "MTN",
  "0817": "9mobile",
  "0818": "9mobile",

  "0901": "Airtel",
  "0902": "Airtel",
  "0903": "MTN",
  "0904": "Airtel",
  "0905": "Globacom",
  "0906": "MTN",
  "0907": "Airtel",
  "0908": "9mobile",
  "0909": "9mobile",

  "0911": "Airtel",
  "0912": "Airtel",
  "0913": "MTN",
  "0915": "Globacom",
  "0916": "MTN"
}

export const phoneNumberRegex = /^(070[1234568]|080[2356789]|081[0-8]|090[1-9]|091[12356])\d{7}$/;

export const baseUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:' + process.env.PORT
  : process.env.SERVER_URL;