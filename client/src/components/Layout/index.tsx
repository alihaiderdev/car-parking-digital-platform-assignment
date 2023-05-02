import HeaderComponent from '../Header';
import ScrollToTopComponent from '../ScrollToTop';

export interface ILayoutComponentProps {
  children: JSX.Element;
}

const LayoutComponent: React.FunctionComponent<ILayoutComponentProps> = ({ children }) => {
  return (
    <>
      <ScrollToTopComponent />
      <HeaderComponent />
      <main className="mt-[72px] container xl:max-w-screen-xl mx-auto py-8">{children}</main>
    </>
  );
};

export default LayoutComponent;
