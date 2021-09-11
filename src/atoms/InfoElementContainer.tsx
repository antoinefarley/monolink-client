import './InfoElementContainer.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const InfoElementContainer = (props: any) => {
  const { icon, text, onClick, isLink = '' } = props;

  const Link = (props: any) => (
    <a
      className="info_element_container"
      href={isLink}
      target="_blank"
      rel="noreferrer"
    >
      {props.children}
    </a>
  );
  const Div = (props: any) => (
    <div className="info_element_container" onClick={onClick}>
      {props.children}
    </div>
  );

  const content = (
    <>
      <div className="info_element_icon">
        <FontAwesomeIcon icon={icon} color="black" size="lg" />
      </div>
      <div className="info_element_text">{text} </div>
    </>
  );
  return isLink ? <Link>{content} </Link> : <Div>{content}</Div>;
};
