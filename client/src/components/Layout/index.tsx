import HeaderComponent from '../Header';

export interface ILayoutComponentProps {
  children: JSX.Element;
}

const LayoutComponent: React.FunctionComponent<ILayoutComponentProps> = ({ children }) => {
  return (
    <>
      <HeaderComponent />
      <main className="mt-[72px] container mx-auto py-8">{children}</main>
    </>
  );
};

export default LayoutComponent;
