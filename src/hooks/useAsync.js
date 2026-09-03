import { useCallback, useState } from 'react';

export default function useAsync() {
  const [loading, setLoading] = useState(false);
  const run = useCallback(async (operation) => { setLoading(true); try { return await operation(); } finally { setLoading(false); } }, []);
  return { loading, run };
}
