/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";

const client = axios.create({ baseURL: "http://localhost:5173" });

export const request = ({ ...options }) => {
  //    client.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
  client.defaults.headers.common["Authorization"] = `Bearer token`;

  const onSuccess = (response: any) => response;
  const onError = (error: any) => {
    //optionally check for error.response.status here and do something if you want, like redirect to login page or whatever
    return error;
  };
  return client(options).then(onSuccess).catch(onError);
};
