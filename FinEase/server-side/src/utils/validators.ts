import joi from "joi";
import { phoneNumberRegex } from "./constants";

export const options = {
  abortEarly: false,
  errors: { wrap: { label: "" } },
};

export const signup = joi.object().keys({
  first: joi.string().required(),
  last: joi.string().required(),
  email: joi.string().email().required(),
  username: joi.string().required(),
  phone: joi.string().required(),
  password: joi.string().min(6).required(),
  confirm: joi.string().valid(joi.ref('password')).required().messages({'any.only': 'Passwords do not match'}),
});

export const login = joi.object().keys({
  emailOrUsername: joi.string().required().trim(),
  password: joi.string().required(),
});

export const adminSignup = joi.object().keys({
  first: joi.string().required(),
  last: joi.string().required(),
  email: joi.string().email().required(),
  username: joi.string().required(),
  phone: joi.string().required(),
  password: joi.string().min(6).required(),
  confirm: joi.string().valid(joi.ref('password')).required().messages({'any.only': 'Passwords do not match'}),
  adminKey: joi.string().required()
});

export const transferFunds = joi.object().keys({
  acctNoOrUsername: joi.string().required(),
  amount: joi.number().min(1).required(),
  password: joi.string().required()
});


export const rechargeAirtime = joi.object().keys({
  operatorId: joi.string().required(),
  phone: joi.string().required().regex(phoneNumberRegex).messages({'string.pattern.base': 'Invalid phone number'}),
  amount: joi.number().integer().min(1).required(),
});

export const buyData = joi.object().keys({
  operatorId: joi.string().required(),
  phone: joi.string().required().regex(phoneNumberRegex).messages({'string.pattern.base': 'Invalid phone number'}),
  dataPlanId: joi.string().required(),
});

export const buyElectricity = joi.object().keys({
  amount: joi.number().integer().min(1).required(),
  operatorId: joi.string().required(),
  meterType: joi.string().required(),
  meterNumber: joi.string().required(),
})

export const updateUser = joi.object().keys({
  first: joi.string().max(50),
  last: joi.string().max(50),
  email: joi.string().email(),
  phone: joi.string().regex(phoneNumberRegex).messages({'string.pattern.base': 'Invalid phone number'}),
  password: joi.string().min(6),
  confirm: joi.string().valid(joi.ref('password')).messages({'any.only': 'Passwords do not match'}),
  oldPassword: joi.string(),
});

export const forgotPassword = joi.object().keys({
  email: joi.string().email().required().trim(),
});

export const resetPassword = joi.object().keys({
  password: joi.string().min(6).required(),
  confirm: joi.string().valid(joi.ref('password')).required().messages({'any.only': 'Passwords do not match'}),
  otp: joi.string().required().trim(),
  email: joi.string().email().required().trim(),
});