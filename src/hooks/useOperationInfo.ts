import { useLocation } from 'react-router-dom';

export function useOperationId(): string | null {
  const location = useLocation();

  // sample location.pathname = "/operation/987497598743574356"
  const match = location.pathname.match(/operation\/([^/]+)/);
  return match ? match[1] : null;
}
