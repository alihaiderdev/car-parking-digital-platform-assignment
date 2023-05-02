import { useEffect } from 'react';

export interface IScrollToTopComponentProps {}

const ScrollToTopComponent: React.FunctionComponent<IScrollToTopComponentProps> = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
};

export default ScrollToTopComponent;
