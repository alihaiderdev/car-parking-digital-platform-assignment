import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const parseJwt = (token: string): string | null => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export const AuthVerify = (props: any) => {
  let location = useLocation();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (Object.keys(user)?.length > 0) {
      const decodedJwt = parseJwt(user?.token);
      //@ts-ignore
      if (decodedJwt?.exp * 1000 < Date.now()) {
        props.logout();
      }
    }
  }, [location, props]);

  return null;
};

export const stringFirstLetterToUpperCase = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

export const range = (start: number, stop: number, step: number = 1): number[] => {
  // console.log({ start, stop, step });
  if (typeof stop == 'undefined') {
    stop = start;
    start = 0;
  }
  const result = [];
  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i);
  }
  return result;
};

export const dateTimeFormatter = (date: Date) => {
  if (date) {
    return `${new Date(date).toDateString()} - ${new Date(date).toLocaleTimeString()}`;
  }
};

export const getBase64 = (file: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log('onload');
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      console.log('onerror');
      reject(error);
    };
  });

export const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
    integer: '${label} is not a valid integer!'
  },
  number: {
    range: '${label} must be between ${min} and ${max}'
  }
};

export const formatDate = (date: Date) => {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
};

export const openNotificationWithIcon = (api: any, type: string, message: string): void => {
  if (type === 'success') {
    api[type]({
      message: 'Success' || type,
      description: message || 'Success!'
    });
  } else if (type === 'error') {
    api[type]({
      message: 'Error' || type,
      description: message || 'Something went wrong!'
    });
  }
};
