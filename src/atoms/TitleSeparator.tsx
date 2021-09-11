import styled from 'styled-components';

export const TitleSeparator = ({ children }) => (
  <StyledTitleSeparator>
    <StyledTitle>{children}</StyledTitle>
    <StyledSeparator className="separator" />
  </StyledTitleSeparator>
);
const StyledTitleSeparator = styled.div`
  width: 100%;
  height: fit-content;
`;

const StyledTitle = styled.div`
  width: 100%;
  text-align: left;
  font-weight: bold;
  font-size: 16px;
`;
const StyledSeparator = styled.div`
  width: 100%;
  height: 2px;
  background-color: black;
  margin-top: 6px;
  margin-bottom: 10px;
`;
