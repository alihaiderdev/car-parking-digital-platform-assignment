import { Link } from 'react-router-dom';
import ScrollToTopComponent from '../../components/ScrollToTop';

export interface IPageNotFoundScreenProps {}

const PageNotFoundScreen: React.FC<IPageNotFoundScreenProps> = (props) => {
  return (
    <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
      <ScrollToTopComponent />
      <div className="container xl:max-w-screen-xl flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
          <p className="mt-4 mb-8 dark:text-gray-400">But dont worry, you can find plenty of other things on our dashboard.</p>
          <Link to={'/parkings'} className="px-8 py-3 font-semibold rounded text-white hover:text-white" style={{ background: `linear-gradient(195deg, #49a3f1, #1A73E8)` }}>
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PageNotFoundScreen;
