import './Tabs.scss';

import { IconButton } from '@components/IconButton/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { createContext, useContext, useRef } from 'react';

import { cn } from '../../utils/cn';

const TabsContext = createContext({
  onSelect: null,
  selected: null,
  tabIcons: null,
});

export const Tabs = (props) => {
  const { children, selected, onSelect, tabIcons = {} } = props;
  const ref = useRef(null);

  return (
    <TabsContext.Provider value={{ onSelect, selected, tabIcons }}>
      <div ref={ref} className="tabs">
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export const TabElem = (props) => {
  const { children, selector, icon, onIconClick } = props;
  const { onSelect, selected } = useContext(TabsContext);

  const onClick = () => {
    onSelect && onSelect(selector);
  };

  return (
    <div
      {...cn('tab-elem', selected === selector && 'selected')}
      onClick={onClick}
    >
      <div className="tab-elem-text">{children}</div>

      {icon && (
        <div className="tab-elem-icon" onClick={onIconClick}>
          <IconButton
            {...props}
            actionStatus="valid"
            st={{
              width: '40px',
              height: '25px',
              borderSize: '0px',
              borderRadius: '7px',
              validColor: 'transparent',
              hideBoxShadow: true,
              fullSizeIcon: true,
            }}
          >
            <FontAwesomeIcon icon={icon} color="white" size="sm" />
          </IconButton>
        </div>
      )}
    </div>
  );
};
