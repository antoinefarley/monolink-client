import './SearchItemContainer.scss';

import React from 'react';
import { v4 as uuid } from 'uuid';

const InfoField = (props: any) => {
  const { title, children, content } = props;
  return (
    <div className="info_field_container">
      <div className="info_field_title">{title}</div>
      <div className="info_field_content">
        {children}
        {content}
      </div>
    </div>
  );
};

export const SearchItemContainer = (props: {
  actionStatus: string;
  resultInfo: any;
}) => {
  const {
    actionStatus,
    resultInfo: { img = '', url = '', isrc = '', ...fields } = {},
  } = props;

  return (
    <div
      className={`search_item_container ${actionStatus} ${
        img === '' ? 'noimage' : ''
      }`}
    >
      <div className="platform_result_container">
        <div className="background_image">
          <img src={img} />
        </div>
        <div className="info_container">
          <div className="info_wrapper">
            {Object.entries(fields).map(([key, val]) => {
              return (
                val !== '' && (
                  <InfoField key={uuid()} title={`${key}:`}>
                    {val}
                  </InfoField>
                )
              );
            })}
          </div>
          <div className="cover_container">
            <img src={img} alt="cover" />
          </div>
        </div>
      </div>
    </div>
  );
};
