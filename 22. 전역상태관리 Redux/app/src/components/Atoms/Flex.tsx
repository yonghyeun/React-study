import styled from 'styled-components';
import { FlexProps } from 'types';

const Flex = styled.section<FlexProps>`
  display: flex;
  flex-direction: ${(props) => (props.direction === 'row' ? 'row' : 'column')};
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 24px;
`;

Flex.defaultProps = {
  direction: 'row',
};

export default Flex;
