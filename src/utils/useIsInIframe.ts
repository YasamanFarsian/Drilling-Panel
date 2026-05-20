import { useEffect, useState } from 'react';

const useIsInIframe = () => {
  const [isInIframe, setIsInIframe] = useState(false);

  useEffect(() => {
    setIsInIframe(window.self !== window.top);
  }, []);

  return isInIframe;
};

export default useIsInIframe;
