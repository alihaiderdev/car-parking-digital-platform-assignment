import { Helmet } from 'react-helmet';

export interface ITabInfoComponentProps {
  title: string;
}

const TabInfoComponent: React.FunctionComponent<ITabInfoComponentProps> = ({ title }) => {
  return (
    <Helmet>
      <title>Digital Platform ({title})</title>
    </Helmet>
  );
};

export default TabInfoComponent;
