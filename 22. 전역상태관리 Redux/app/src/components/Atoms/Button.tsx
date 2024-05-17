import { ReactNode } from 'react';
import styled from 'styled-components';

const Button = styled.button<{ children: ReactNode; width?: string }>`
  padding: 16px;
  font-size: 24px;
  min-width: 100px;
  color: purple;
  background-color: #d8bfd8;
  border: none;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
`;

Button.defaultProps = {
  width: '100',
};

export default Button;
