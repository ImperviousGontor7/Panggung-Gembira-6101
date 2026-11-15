import { useCallback, useEffect, useRef, useState } from "react";
import api from "../../../api/axios";

export function useFetch(
  url,
  {
    method = "get",
    params = undefined,
    data = undefined,
    immediate = true,
    initialData = null,
    transform = null,
  } = {}
) {
  const [result, setResult] = useState(initialData);
  const [loading, setLoading] = useState(Boolean(immediate));
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const fetchData = useCallback(
    async (overrides = {}) => {
      if (!url) {
        throw new Error("useFetch membutuhkan url.");
      }

      if (abortRef.current) {
        abortRef.current.abort();
      }

      const controller = new AbortController();
      abortRef.current = controller;

      setLoading(true);
      setError(null);

      try {
        const response = await api.request({
          url,
          method,
          params: overrides.params ?? params,
          data: overrides.data ?? data,
          signal: controller.signal,
        });

        const payload = response.data?.data ?? response.data;
        const nextValue =
          typeof transform === "function"
            ? transform(payload, response)
            : payload;

        setResult(nextValue);
        return nextValue;
      } catch (err) {
        if (err?.code === "ERR_CANCELED") {
          return undefined;
        }

        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [url, method, params, data, transform]
  );

  useEffect(() => {
    if (!immediate || !url) return undefined;

    fetchData();

    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, [immediate, url, fetchData]);

  useEffect(
    () => () => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
    },
    []
  );

  return {
    data: result,
    setData: setResult,
    loading,
    setLoading,
    error,
    setError,
    refetch: fetchData,
  };
}

export default useFetch;