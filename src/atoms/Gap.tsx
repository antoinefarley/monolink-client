import styled from 'styled-components';

export const Gap = (props) => {
  const { vertical = false, size } = props;

  return (
    <StyledGap
      width={vertical ? size : '100%'}
      height={vertical ? '100%' : size}
    />
  );
};

const StyledGap = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;
