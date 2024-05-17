import styled, { keyframes, css } from 'styled-components';

import { ProgressBarProps } from 'types';

const fillProgressBar = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
`;

const ProgressBarView = styled.section<ProgressBarProps>`
  height: 100%;
  background-color: purple;
  opacity: 0.5;
  position: absolute;
  left: 0;
  top: 0;
  animation: ${(props) =>
    props.$isGoing
      ? css`
          ${fillProgressBar} 2s infinite
        `
      : 'none'};
`;

const ProgressBar: React.FC<ProgressBarProps> = ({ $isGoing }) => {
  return <ProgressBarView $isGoing={$isGoing} />;
};

export default ProgressBar;
