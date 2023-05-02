import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { IUser } from '../models/user.model';

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
    const user: IUser = JSON.parse(localStorage.getItem('user') as string);

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

export const range = (start: number, stop: number, step: number = 1): number[] => {
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

export function duration(startTime: string, endTime: string) {
  // @ts-ignore
  let d = new Date(startTime) - new Date(endTime);
  let weekdays = Math.floor(d / 1000 / 60 / 60 / 24 / 7);
  let days = Math.floor(d / 1000 / 60 / 60 / 24 - weekdays * 7);
  let hours = Math.floor(d / 1000 / 60 / 60 - weekdays * 7 * 24 - days * 24);
  let minutes = Math.floor(d / 1000 / 60 - weekdays * 7 * 24 * 60 - days * 24 * 60 - hours * 60);
  let seconds = Math.floor(d / 1000 - weekdays * 7 * 24 * 60 * 60 - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60);
  let milliseconds = Math.floor(d - weekdays * 7 * 24 * 60 * 60 * 1000 - days * 24 * 60 * 60 * 1000 - hours * 60 * 60 * 1000 - minutes * 60 * 1000 - seconds * 1000);
  let t: any = {};
  ['weekdays', 'days', 'hours', 'minutes', 'seconds', 'milliseconds'].forEach((q) => {
    if (eval(q) > 0) {
      t[q] = eval(q);
    }
  });
  return t;
}
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
