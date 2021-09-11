// [IMPORTS]
/* node_modules */
import { useEffect, useState } from 'react';

const getInitialLocalStorage = (name: string) => {
  const fromStorage: any = localStorage.getItem(name);
  const res = [null, undefined, []].includes(fromStorage)
    ? []
    : JSON.parse(fromStorage);
  return res;
};

// [CUSTOM HOOK]
export const useSyncLocalStorage = (
  name: string,
  newElement: any,
  options: {
    array: boolean;
    filter: (item: any) => boolean;
  },
) => {
  const { array = false, filter = null } = options;
  const [state, _setState] = useState(getInitialLocalStorage(name));

  const setLocalStorageAndState = (newValue) => {
    localStorage.setItem(name, JSON.stringify(newValue));
    _setState(newValue);
  };

  const setState = (newElement) => {
    if (!array) {
      setLocalStorageAndState(newElement);
    } else {
      const fromState = [...state];

      if (
        !filter ||
        !fromState.find((item) => filter(item) === filter(newElement))
      ) {
        fromState.push(newElement);
        setLocalStorageAndState(fromState);
      }
    }
  };

  useEffect(() => {
    newElement && setState(newElement);
  }, [newElement]);

  return [state, setLocalStorageAndState];
};
