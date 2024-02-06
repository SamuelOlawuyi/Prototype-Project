import { useOutletContext } from "react-router-dom";
import { IUser } from "../../types";
import { useEffect, useState } from "react";
import Api from "../../api.config";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";


function BasicInfoEditForm({ user }: { user: IUser }) {
  const [state, setState] = useState<State>({
    loading: false
  });
  const { loading } = state;

  const { register, handleSubmit, setValue } = useForm<BasicInputs>();
  useEffect(() => {
    setValue('first', user.fullName.split(' ')[0]);
    setValue('last', user.fullName.split(' ')[1]);
    setValue('email', user.email);
    setValue('phone', user.phone);
  }, [user, setValue])

  function onSubmit(data: BasicInputs) {
    setState(s => ({ ...s, loading: true }));
    const { first, last, email, phone } = data;
    editUserApi(first, last, email, phone);
  }

  function handleReset() {
    setValue('first', user.fullName.split(' ')[0]);
    setValue('last', user.fullName.split(' ')[1]);
    setValue('email', user.email);
    setValue('phone', user.phone);
  }

  function editUserApi(first: string, last: string, email: string, phone: string) {
    Api.put('account', { first, last, email, phone })
      .then(res => {
        toast.success(res.data.message);
        setState(s => ({ ...s, loading: false }));
      })
      .catch(err => {
        toast.error(err.response.data.message);
        setState(s => ({ ...s, loading: false }));
      });
  }

  /**Prevent user from entering a space on the target input element.
   * Should be used on the onKeyUp event */
  function preventSpace(e: React.KeyboardEvent<HTMLInputElement>) {
    const { value, name } = e.currentTarget;
    if (value.split(' ').length > 1) {
      setValue(name as 'first' | 'last', value.split(' ').join(''));
    }
  }

  return (
    <div className="mb-4">
      <h3>Edit User Information</h3>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mb-3">
          <div className="form-floating">
            <input onKeyUp={preventSpace} {...register('first')} className="form-control" id="first" type="text" placeholder="first name" required />
            <label htmlFor="first" >First name</label>
          </div>
        </div>

        <div className="input-group mb-3">
          <div className="form-floating">
            <input onKeyUp={preventSpace} {...register('last')} className="form-control" id="last" type="text" placeholder="last name" required />
            <label htmlFor="last">Last name</label>
          </div>
        </div>

        <div className="input-group mb-3">
          <div className="form-floating">
            <input {...register('email')} className="form-control" id="email" type="email" required />
            <label htmlFor="email">Email</label>
          </div>
        </div>

        <div className="input-group mb-3">
          <div className="form-floating">
            <input {...register('phone')} className="form-control" id="phone" type="tel" required />
            <label htmlFor="phone">Phone number</label>
          </div>
        </div>

        <div className='d-flex justify-content-center gap-3'>
          <button disabled={loading} className="btn btn-primary w-100" >{loading ? 'Processing' : 'Confirm Changes'}</button>
          <button className="btn btn-danger w-100" onClick={handleReset} type="button">Cancel</button>
        </div>
      </form>
    </div>
  );

  interface BasicInputs {
    first: string;
    last: string;
    email: string;
    phone: string;
  }

  interface State {
    loading: boolean;
  }
}

function PasswordEditForm() {
  const [state, setState] = useState<State>({
    loading: false,
  });

  const { loading } = state;
  const { register, handleSubmit } = useForm<PasswordInputs>();

  function onSubmit(data: PasswordInputs) {
    setState(s => ({ ...s, loading: true }));
    const { oldPassword, newPassword, confirmPassword } = data;
    editPasswordApi(oldPassword, newPassword, confirmPassword);
  }

  function editPasswordApi(oldPassword: string, newPassword: string, confirmPassword: string) {
    Api.put('account', { password: newPassword, confirm: confirmPassword, oldPassword })
      .then(res => {
        toast.success(res.data.message);
        setState(s => ({ ...s, loading: false }));
      })
      .catch(err => {
        toast.error(err.response.data.message);
        setState(s => ({ ...s, loading: false }));
      });
  }

  return (
    <div>
      <h3>Security</h3>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mb-3">
          <div className="form-floating">
            <input {...register('newPassword')} placeholder="New Password" className="form-control" id="new-password" type="password" />
            <label htmlFor="new-password" >New Password</label>
          </div>
        </div>
        <div className="input-group mb-3">
          <div className="form-floating">
            <input {...register('newPassword')} placeholder="Confirm New Password" className="form-control" name="confirmPassword" id="confirm-new" type="password" />
            <label htmlFor="confirn-new">Confirm New Password</label>
          </div>
        </div>
        <div className="input-group mb-3">
          <div className="form-floating">
            <input {...register('newPassword')} placeholder="Old Password" className="form-control" name="oldPassword" id="old" type="password" />
            <label htmlFor="old">Old Password</label>
          </div>
        </div>
        <button className="btn btn-secondary w-100" disabled={loading} >{loading ? 'Processing...' : 'Confirm Change Password'}</button>
      </form>
    </div>
  );

  interface PasswordInputs {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }

  interface State {
    loading: boolean;
  }
}

function Settings() {
  const [user] = useOutletContext() as [IUser];

  return (
    <div id="settings">
      <div className="mb-3">
        <h1>Settings</h1>
      </div>
      <BasicInfoEditForm user={user} />
      <PasswordEditForm />
    </div>
  )
}

export default Settings;
