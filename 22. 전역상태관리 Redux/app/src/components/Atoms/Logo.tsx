import styled, { keyframes } from 'styled-components';
import { ReactComponent as LogoSVG } from 'assets/logo.svg';

const moveUpDown = keyframes`
  0% {
    transform : translateY(0);
  }
  50% {
    transform : translateY(20px);
  }
  100% {
    transform : translateY(0);
`;

const ReduxLogo = styled(LogoSVG)`
  width: 200px;
  height: 200px;
  animation: ${moveUpDown} 2s infinite;
`;

export default ReduxLogo;
