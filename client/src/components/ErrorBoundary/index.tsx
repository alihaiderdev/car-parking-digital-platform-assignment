import { Component, ReactNode } from 'react';

export interface IErrorBoundaryComponentProps {
  children: ReactNode;
}

export interface IErrorBoundaryComponentState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<IErrorBoundaryComponentProps, IErrorBoundaryComponentState> {
  constructor(props: IErrorBoundaryComponentProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="h-screen w-screen bg-gray-100 flex items-center">
          <div className="container xl:max-w-screen-xl flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
            <div className="max-w-md">
              <div className="text-5xl font-dark font-bold">404</div>
              <p className="text-2xl md:text-3xl font-light leading-normal">Sorry we couldn't find this page. </p>
              <p className="mb-8">But dont worry, you can find plenty of other things on our homepage.</p>

              <button className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700">
                back to homepage
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
function logErrorToMyService(error: any, errorInfo: any) {
  throw new Error('Function not implemented.');
}
