import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

const CountView = styled.h1`
  font-size: 36px;
`;

const Count = () => {
  const num = useSelector((state: RootState) => state.counter.value);

  return <CountView>{num}</CountView>;
};

export default Count;
