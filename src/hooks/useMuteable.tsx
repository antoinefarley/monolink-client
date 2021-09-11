// [IMPORTS]
import React from 'react';

// [TYPES]
/**
 * Returns the current value of the ref
 */
type IUseMutableGetter = () => any;
/**
 * Sets the current value of the ref
 */
type IUseMutableSetter = (newValue: any) => void;
/**
 * Takes an initial value and returns an array with getter and setter
 */
type IUseMutable = [IUseMutableGetter, IUseMutableSetter];

// [CUSTOM HOOK]
/**
 * Wraps useRef to use with the same syntax as useState
 * @param {any} initialValue initial value of useRef
 * @returns {IUseMutable} array with getter at position 0 and setter at position 1
 */
const useMuteable = (initialValue: any): IUseMutable => {
  const ref = React.useRef(initialValue);
  return [
    () => ref.current,
    (newValue: any) => {
      ref.current = newValue;
    },
  ];
};

export default useMuteable;
