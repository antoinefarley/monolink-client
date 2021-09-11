// [IMPORTS]
/* node_modules */
import { useEffect } from 'react';

// [CUSTOM HOOK]
export const useInitialLocalStorage = (
  name: string,
  setLocObj: (obj: any) => void,
) => {
  return useEffect(() => {
    const locObj = localStorage.getItem(name);
    if (!['', 'null', '[]', null].includes(locObj)) {
      setLocObj(JSON.parse(locObj));
    }
  }, []);
};
