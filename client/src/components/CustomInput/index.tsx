import { useState, ReactNode } from 'react';

export interface ICustomInputComponentProps {
  placeholder: string;
  hasLabel?: boolean;
  label: string;
  name: string;
  type: any;
  icon?: ReactNode;
  value: any;
  onChange: any;
  required?: boolean;
  inputClasses?: string;
  rest?: any;
}

const CustomInputComponent: React.FunctionComponent<ICustomInputComponentProps> = ({
  placeholder,
  hasLabel = true,
  label,
  name,
  type,
  icon,
  value,
  onChange,
  required = true,
  inputClasses = '',
  ...rest
}) => {
  label = label || name;
  const [eyeToggler, setEyeToggler] = useState(false);

  return (
    <div>
      {hasLabel ? (
        <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
      ) : null}
      <div className="relative">
        <input
          type={eyeToggler ? 'text' : type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`bg-gray-50 border-2 focus:outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${inputClasses}`}
          required={required}
          {...rest}
          autoComplete="on"
          autoCapitalize="off"
          autoCorrect="on"
          spellCheck="true"
        />
        {icon ? icon : null}
        {type === 'password' ? (
          <button type="button" className="absolute top-[10px] right-[10px]" onClick={() => setEyeToggler(!eyeToggler)}>
            {!eyeToggler ? 'Show' : 'Hide'}
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default CustomInputComponent;
