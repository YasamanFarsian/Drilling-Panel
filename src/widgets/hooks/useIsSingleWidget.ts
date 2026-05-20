import { useLocation } from 'react-router-dom';

const useIsSingleWidget = (): boolean => {
  const location = useLocation();
  return location.pathname.startsWith('/widget/');
};

export default useIsSingleWidget;
