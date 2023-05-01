import { ReactNode } from 'react';

export interface IFormLayoutComponentProps {
  imageUrl?: string;
  formTitle?: string;
  children: ReactNode;
}

const FormLayoutComponent: React.FunctionComponent<IFormLayoutComponentProps> = ({
  imageUrl = 'https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg',
  formTitle = 'Login',
  children
}) => {
  return (
    <section className="h-screen">
      <div className="container h-full px-6 py-24 mx-auto">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img src={imageUrl} className="w-full" alt="Phone image" />
          </div>
          <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white uppercase">{formTitle}</h1>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormLayoutComponent;
