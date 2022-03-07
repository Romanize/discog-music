import { AxiosError, AxiosPromise } from "axios";
import { useEffect, useState } from "react";
import _debounce from 'lodash/debounce'

export function useFetch<T>(
  callback: () => AxiosPromise<T>,
  initialValue: T | null = null,
): [T | null, AxiosError | null, boolean] {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);


  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await callback();
        if (response) setData(response.data);
      } catch (e: unknown) {
        setError(e as AxiosError);
      } finally {
        setLoading(false);
      }
    })();
  }, [callback]);

  return [data, error, loading];
}
