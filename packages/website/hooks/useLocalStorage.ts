import { useState, useEffect } from "react";

// ----------------------------------------------------------------------

export default function useLocalStorage<ValueType>(
  key: string,
  defaultValue: ValueType
) {
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem(key);

      return storedValue === null ? defaultValue : JSON.parse(storedValue);
    }
  });
  const isWindow = typeof window !== 'undefined';

  const setValueInLocalStorage = (newValue: ValueType) => {
    setValue((currentValue: any) => {
      const result =
        typeof newValue === "function" ? newValue(currentValue) : newValue;

      localStorage.setItem(key, JSON.stringify(result));

      return result;
    });
  };

  return [value, setValueInLocalStorage];
}
