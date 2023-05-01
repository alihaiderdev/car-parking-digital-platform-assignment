import { notification } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context';
import { useRegisterMutation } from '../../store/features/apiSlice';
import CustomInputComponent from '../../components/CustomInput';
import CustomButtonComponent from '../../components/CustomButton';
import { openNotificationWithIcon } from '../../utils';
import TabInfoComponent from '../../components/TabInfo';

export interface IRegisterScreenProps {}

export type TUser = {
  name: string;
  email: string;
  password: string;
};

const RegisterScreen: React.FC<IRegisterScreenProps> = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const [register, { data, isLoading }] = useRegisterMutation();

  const [admin, setAdmin] = useState<TUser>({
    name: '',
    email: '',
    password: ''
  });
  const { name, email, password } = admin;

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      navigate('/');
    }
  }, [Object.keys(user).length]);

  useEffect(() => {
    if (data?.success) {
      navigate('/login');
    } else if (data?.error) {
      openNotificationWithIcon(api, 'error', data?.message || 'Something went wrong!');
    }
  }, [JSON.stringify(data)]);

  const onValueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    }: { target: { name: string; value: any } } = event;
    setAdmin({ ...admin, [name]: value });
  };

  const submitHandler = async (e: React.FormEvent): Promise<void> => {
    try {
      e.preventDefault();
      await register(admin);
    } catch (error: any) {
      console.log('Error: ', error.message);
      openNotificationWithIcon(api, 'error', error.message || 'Something went wrong!');
    }
  };

  return (
    <>
      {contextHolder} <TabInfoComponent title="Register" />
      <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
        <CustomInputComponent placeholder="Enter your fullname!" label="Fullname" type={'text'} name={'name'} value={name} onChange={onValueChangeHandler} />
        <CustomInputComponent placeholder="Enter your email!" label="Email" type={'text'} name={'email'} value={email} onChange={onValueChangeHandler} />
        <CustomInputComponent placeholder="••••••••" label="Password" type={'password'} name={'password'} value={password} onChange={onValueChangeHandler} />

        <CustomButtonComponent buttonClasses="w-full" title="Register" isLoading={isLoading} />

        <h6 className="text-slate-500 text-right">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 font-semibold">
            Login
          </Link>
        </h6>
      </form>
    </>
  );
};

export default RegisterScreen;
