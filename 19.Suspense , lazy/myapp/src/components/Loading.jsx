import { styled } from 'styled-components';

const LoadingView = styled.section`
  padding: 10px;
  color: white;
  background: tomato;
  font-size: 16px;
`;

const Loading = () => {
  return <LoadingView>Loading .. </LoadingView>;
};

export default Loading;
