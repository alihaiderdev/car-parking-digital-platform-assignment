import { Spin } from 'antd';
import { ReactNode } from 'react';

export interface ICustomButtonComponentProps {
  isLoading: boolean;
  title: string;
  size?: 'small' | 'default' | 'large' | undefined;
  delay?: number;
  spinnerClasses?: string;
  buttonClasses?: string;
  buttonType?: string;
  type?: 'submit' | 'button' | 'reset' | undefined;
  children?: ReactNode;
  rest?: React.HTMLProps<HTMLDivElement>;
}

const CustomButtonComponent: React.FunctionComponent<ICustomButtonComponentProps> = ({
  isLoading,
  title,
  size = 'small',
  delay = 60,
  spinnerClasses = '',
  buttonClasses = '',
  buttonType = 'default',
  type = 'submit',
  children,
  ...rest
}) => {
  return (
    <button
      disabled={isLoading ? true : false}
      type={type}
      className={`transition ease-in-out delay-150 focus:ring-3 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
        buttonType === 'default'
          ? 'text-white bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          : 'border border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500'
      } ${buttonClasses}`}
      {...rest}
    >
      {children ? (
        <span className="flex items-center">
          {children} {title}
        </span>
      ) : (
        <>
          {isLoading && <Spin size={size} delay={delay} className={`mr-4 ${spinnerClasses} spinner`} />} {title}
        </>
      )}
    </button>
  );
};

export default CustomButtonComponent;
