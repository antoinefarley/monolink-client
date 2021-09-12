import styled from 'styled-components';

import { GitHubButton } from '../components/IconButton/IconButton';

export const HeaderInfo = () => {
  return (
    <StyledHeaderInfo>
      <StyledLogo src="monolink_logo.png" />
      <GitHubButton
        onClick={() => {
          window.open(
            'https://github.com/antoinefarley/monolink-client',
            '_blank',
          );
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
