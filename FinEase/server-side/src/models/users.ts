import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  acctNo: string;
  isAdmin: boolean;
  username: string;
  emailVerified: boolean;
  emailVerificationToken: string;
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  acctNo: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: {
    type: String,
  }
}, {
  timestamps: true
})

const User = mongoose.model<IUser>('User', userSchema);

export default User;