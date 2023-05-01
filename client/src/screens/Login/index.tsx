import { notification } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context';
import { useLoginMutation } from '../../store/features/apiSlice';
import CustomInputComponent from '../../components/CustomInput';
import CustomButtonComponent from '../../components/CustomButton';
import { openNotificationWithIcon } from '../../utils';
import TabInfoComponent from '../../components/TabInfo';

export interface ILoginScreenProps {}

export type TUser = {
  email: string;
  password: string;
};
const LoginScreen: React.FC<ILoginScreenProps> = () => {
  const { user, login: signin } = useAuthContext();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const [login, { data, isLoading }] = useLoginMutation();

  let [admin, setAdmin] = useState<TUser>({
    email: localStorage.getItem('username') || '',
    password: localStorage.getItem('password') ? window.atob(localStorage.getItem('password')!) : ''
  });
  const { email, password } = admin;
  const [rememberMe, setRememberMe] = useState<boolean>(localStorage.getItem('rememberMe') ? Boolean(localStorage.getItem('rememberMe')) : false);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      navigate('/');
    }
  }, [Object.keys(user).length]);

  useEffect(() => {
    if (data?.success) {
      signin(data?.data);
      navigate('/parkings');
    } else if (data?.error) {
      openNotificationWithIcon(api, 'error', data?.message || 'Something went wrong!');
    }
  }, [JSON.stringify(data)]);

  const handleRememberMe = (e: React.FormEvent<HTMLInputElement>) => {
    setRememberMe(e.currentTarget.checked);
    if (e.currentTarget.checked) {
      const encryptedPassword = window.btoa(password);
      localStorage.setItem('email', email);
      localStorage.setItem('password', encryptedPassword);
      localStorage.setItem('rememberMe', String(rememberMe));
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.removeItem('rememberMe');
      setAdmin({ email: '', password: '' });
    }
  };

  const onValueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    }: { target: { name: string; value: any } } = event;
    setAdmin({ ...admin, [name]: value });
  };

  const submitHandler = async (e: React.FormEvent): Promise<void> => {
    try {
      e.preventDefault();
      await login(admin);
    } catch (error: any) {
      console.log('Error: ', error.message);
      openNotificationWithIcon(api, 'error', error.message || 'Something went wrong!');
    }
  };

  return (
    <>
      {contextHolder} <TabInfoComponent title="Login" />
      <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
        <CustomInputComponent placeholder="Enter your email!" label="Email" type={'text'} name={'email'} value={email} onChange={onValueChangeHandler} />
        <CustomInputComponent placeholder="••••••••" label="Password" type={'password'} name={'password'} value={password} onChange={onValueChangeHandler} />
        <div className="flex items-center justify-between">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                aria-describedby="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                onChange={handleRememberMe}
                defaultChecked={rememberMe}
                disabled={email && password ? false : true}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                Remember me
              </label>
            </div>
          </div>
        </div>

        <CustomButtonComponent buttonClasses="w-full" title="Login" isLoading={isLoading} />

        <h6 className="text-slate-500 text-right">
          Can't have an account?{' '}
          <Link to="/register" className="text-blue-500 font-semibold">
            Signup
          </Link>
        </h6>
      </form>
    </>
  );
};

export default LoginScreen;
