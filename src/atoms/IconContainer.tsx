import './IconContainer.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const IconContainer = (props) => {
  const { faIcon, faColor = null, onClickUrl, onClick = null } = props;
  return (
    <div
      className="icon_container"
      onClick={() => {
        onClickUrl && window.open(onClickUrl, '_blank');
        onClick && onClick();
      }}
    >
      <FontAwesomeIcon icon={faIcon} color={faColor} />
    </div>
  );
};
