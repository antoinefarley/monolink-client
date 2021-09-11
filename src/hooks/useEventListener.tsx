// [IMPORTS]
import React from 'react';

// [TYPES]
/**
 * Returns the current value of the ref
 */
interface IUseEventMountingParamInstance {
  /**
   * Key of dom event to listen to
   */
  ekey: string;

  /**
   * Callback function to be executed
   */
  cb: (...params: any) => any;

  /**
   * What element of ref to call the listener onto
   * @default 'document'
   */
  binding?: string | React.MutableRefObject<HTMLElement>;
}

// [CUSTOM HOOK]
/**
 * Registers (mounts) and unMounts multiple eventListeners
 * @param {any} initialValue initial value of useRef
 * @returns {IUseMutable} array with getter at position 0 and setter at position 1
 */
const useEventListener = (
  instances: Array<IUseEventMountingParamInstance>,
): void => {
  const addRemEventListener = (add: boolean) => {
    instances.forEach((paramInstance: IUseEventMountingParamInstance) => {
      const { ekey, cb, binding = 'document' } = paramInstance;

      (typeof binding === 'string'
        ? binding === 'document'
          ? document
          : window
        : binding.current)[add ? 'addEventListener' : 'removeEventListener'](
        ekey,
        cb,
      );
    });
  };

  React.useEffect(() => {
    addRemEventListener(true);
    return () => addRemEventListener(false);
  }, []);
};

export default useEventListener;
