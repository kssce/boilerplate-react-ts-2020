import { useState, useEffect } from 'react';
import { EMPTY_ARR } from '../constants/common';

type PromiseFunc = () => Promise<any>;
type AnyArr = any[];

/**
 *
 * @param promiseCreator
 * @param deps
 */
export default function usePromise(
  promiseCreator: PromiseFunc,
  deps: AnyArr = EMPTY_ARR,
) {
  const [resolved, setResolved] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const process = async () => {
    setLoading(true);
    try {
      const result = await promiseCreator();
      setResolved(result);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    process();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { loading, resolved, error };
}
