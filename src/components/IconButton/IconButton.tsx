import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sf, sv } from '@styles/styleUtils';
import { cn } from '@utils/cn';
import styled from 'styled-components';

const height = (props) => sf.wh(props?.$st.width, props?.$st.height);

const StyledIconButton = styled.div`
  ${height}
  ${() => sf.flex('column', 'center')}

  border: ${(props) => props.$st.borderSize} transparent solid;
  border-radius: ${(props) => props.$st.borderRadius};
  transition: 0.15s ease-in-out;
  cursor: pointer;

  > svg {
    margin: 0 auto;
    width: auto !important;
    height: ${(props) =>
      props.$st.fullSizeIcon
        ? props.$st.height
        : `calc(0.6 * ${(props) => props.$st.height})`} !important;
  }

  > div {
    line-height: ${(props) => props?.$st.height};
  }

  &.idle,
  &.invalid {
    opacity: 0.4;
    box-shadow: none;
    cursor: default;
    pointer-events: none;
  }

  &.idle {
    background-color: ${(props) => props?.$st.idleColor ?? '#454f5b'};
  }

  &.invalid {
    background-color: ${(props) => props?.$st.invalidColor};
  }

  &.valid {
    background-color: ${(props) => props?.$st.validColor};
    box-shadow: ${(props) =>
      props?.$st.hideBoxShadow ? 'none' : sv.boxShadow};
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
    &:active {
      transform: translateY(${(props) => props.$st.borderSize});
      box-shadow: none;
    }
  }

  /* @media only screen and (max-width: 600px) {
    width: ${(props) => props.$st.height};
  } */
`;

export const IconButton = (props) => {
  const {
    className = '',
    actionStatus = 'valid',
    onClick,
    children = null,
    st,
    ...rest
  } = props;

  return (
    <StyledIconButton
      {...cn(className, actionStatus)}
      onClick={onClick}
      $st={st}
      {...rest}
    >
      {children}
    </StyledIconButton>
  );
};

export const SearchButton = (props) => (
  <IconButton
    {...props}
    st={{
      width: '100px',
      height: '100%',
      borderSize: '0px',
      borderRadius: '7px',
      validColor: sv.green,
      invalidColor: sv.red,
    }}
  >
    <FontAwesomeIcon icon={faSearch} color="white" size="sm" />
  </IconButton>
);

export const ClearHistoryButton = (props) => (
  <IconButton
    {...props}
    st={{
      width: '20px',
      height: '20px',
      borderSize: '0px',
      borderRadius: '3px',
      validColor: sv.red,
    }}
  >
    <FontAwesomeIcon icon={faTimes} color="white" size="sm" />
  </IconButton>
);

export const GitHubButton = (props) => (
  <IconButton
    {...props}
    actionStatus="valid"
    st={{
      width: 'auto',
      height: '100%',
      borderSize: '0px',
      borderRadius: '7px',
      validColor: 'transparent',
      hideBoxShadow: true,
      fullSizeIcon: true,
    }}
  >
    <FontAwesomeIcon icon={faGithub} color="black" size="sm" />
  </IconButton>
);

export const GridButton = (props) => (
  <IconButton
    {...props}
    actionStatus="valid"
    st={{
      width: '25px',
      height: '25px',
      borderSize: '0px',
      borderRadius: '7px',
      validColor: 'transparent',
      hideBoxShadow: true,
      fullSizeIcon: true,
    }}
  >
    <FontAwesomeIcon icon={props.icon} color="white" size="sm" />
  </IconButton>
);

const StyledButtonTextElement = styled.div`
  width: 100%;
  height: fit-content;
  color: ${(props) => props?.$color ?? 'white'};
  font-size: ${(props) => props?.$fontSize ?? '16px'};
  line-height: 100%;
  text-align: center;
  font-weight: bold;
`;
export const TextButton = (props) => {
  const { children, width = '120px', st = {}, ...rest } = props;
  return (
    <IconButton
      {...rest}
      st={{
        width,
        height: '100%',
        borderSize: '0px',
        borderRadius: '7px',
        validColor: sv.green,
        invalidColor: sv.red,
        idleColor: '#b3b3b3',
        ...st,
      }}
    >
      <StyledButtonTextElement>{children}</StyledButtonTextElement>
    </IconButton>
  );
};
