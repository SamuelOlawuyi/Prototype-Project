import { config } from 'dotenv';

config();

const nodeEnv = process.env.NODE_ENV || '';

const dev = {
  log: (msg: any) => {
    if (nodeEnv === 'development') {
      console.log(msg);
    }
  },
  error: (msg: any) => {
    if (nodeEnv === 'development') {
      console.error(msg);
    }
  },
};

export default dev;
