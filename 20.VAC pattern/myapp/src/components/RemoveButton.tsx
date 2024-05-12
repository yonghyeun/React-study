import { TodoType } from './Todo';
import styled from 'styled-components';

type Props = {
  id: number;
  setTodos: (updateFn: (prev: TodoType[]) => TodoType[]) => void;
};

/*
VAC 컴포넌트 생성
해당 VAC 컴포넌트는 단순히 props 들만 전달받아 
렌더링만 하도록 한다
*/
const RemoveButtonView = styled.button`
  padding: '5px';
`;

const RemoveButton: React.FC<Props> = ({ id, setTodos }) => {
  /*비즈니스 로직 처리*/
  const handleClick = () => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  /*렌더링 로직은 VAC 에게 전달*/
  return <RemoveButtonView onClick={handleClick}>Remove</RemoveButtonView>;
};

export default RemoveButton;
