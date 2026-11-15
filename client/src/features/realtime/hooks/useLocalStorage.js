import { useCallback, useEffect, useState } from "react";

function resolveInitialValue(initialValue) {
  return initialValue instanceof Function ? initialValue() : initialValue;
}

function readLocalStorageValue(key, initialValue) {
  if (typeof window === "undefined") {
    return resolveInitialValue(initialValue);
  }

  try {
    const storedValue = window.localStorage.getItem(key);

    if (storedValue === null) {
      return resolveInitialValue(initialValue);
    }

    return JSON.parse(storedValue);
  } catch {
    return resolveInitialValue(initialValue);
  }
}

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() =>
    readLocalStorageValue(key, initialValue)
  );

  useEffect(() => {
    setStoredValue(readLocalStorageValue(key, initialValue));
  }, [key, initialValue]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleStorage = (event) => {
      if (event.key === key) {
        setStoredValue(readLocalStorageValue(key, initialValue));
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [key, initialValue]);

  const setValue = useCallback(
    (value) => {
      if (typeof window === "undefined") return;

      setStoredValue((currentValue) => {
        const valueToStore =
          value instanceof Function ? value(currentValue) : value;

        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        return valueToStore;
      });
    },
    [key]
  );

  const removeValue = useCallback(() => {
    if (typeof window === "undefined") return;

    window.localStorage.removeItem(key);
    setStoredValue(resolveInitialValue(initialValue));
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

export default useLocalStorage;