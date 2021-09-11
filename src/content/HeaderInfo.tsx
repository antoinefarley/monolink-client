import styled from 'styled-components';

import { GitHubButton } from '../components/IconButton/IconButton';
import logob from '../logob.png';

export const HeaderInfo = () => {
  return (
    <StyledHeaderInfo>
      <StyledLogo src={logob} />
      <GitHubButton
        onClick={() => {
          window.open('https://github.com/il20afar/monolink', '_blank');
        }}
      />
    </StyledHeaderInfo>
  );
};

const StyledHeaderInfo = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
`;

const StyledLogo = styled.img`
  height: 100%;
  width: auto;
  margin-left: -14px;
`;
