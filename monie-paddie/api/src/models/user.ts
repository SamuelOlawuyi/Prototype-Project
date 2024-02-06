import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password?: string;
  fullname: string;
  bvn?: string; 
  phoneNumber?: string;
  ssoId?: string;
  ssoProvider?: string;
  verifiedEmail: boolean;
  transactionPinSet?: boolean;
  transactionPin?: string;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: false },
    fullname: { type: String, required: true },
    bvn: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    ssoId: { type: String, required: false },
    ssoProvider: {type: String},
    verifiedEmail: {type: Boolean, default: false},
    transactionPinSet: {type: Boolean, default: false},
    transactionPin: {type: String, required: false, length: 4, default: '0000'},
  },
  { timestamps: true },
);

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
