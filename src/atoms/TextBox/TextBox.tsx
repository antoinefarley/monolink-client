import './TextBox.scss';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export const TextBox = (props) => {
  const {
    value,
    placeholder,
    onChange,
    onSearch,
    onCancel,
    focusOnRender = false,
    inputValidityStatus = 'idle',
    type = 'text',
  } = props;

  const ref = React.useRef(null);

  React.useEffect(() => {
    // if (type === "textarea") whichRef.current.innerHTML = initialValue;
    focusOnRender && ref.current.focus();
  }, []);

  return (
    <div className={`input_container ${inputValidityStatus}`}>
      <input
        ref={ref}
        className={`input_div ${inputValidityStatus}`}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (value !== '' && inputValidityStatus === 'valid') {
              e.preventDefault();
              onSearch();
            }
          }
        }}
        type={type}
      />
      <div
        className={`cancel_icon_container ${
          value === '' ? 'unavailable' : 'available'
        }`}
        onClick={() => {
          onCancel();
        }}
      >
        <FontAwesomeIcon icon={faTimes} color="red" size="sm" />
      </div>
    </div>
  );
};
