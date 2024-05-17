import styled from 'styled-components';

const CountView = styled.h1`
  font-size: 36px;
`;

const Count = () => {
  // TODO 상태 받아 렌더링 하기
  const num = 30;
  return <CountView>{num}</CountView>;
};

export default Count;
