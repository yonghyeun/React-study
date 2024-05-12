import { TodoType } from './Todo';
import style from '../assets/styles';

type Props = {
  id: number;
  setTodos: (updateFn: (prev: TodoType[]) => TodoType[]) => void;
};

type RemoveTodoHandler = () => void;

const RemoveButton: React.FC<Props> = ({ id, setTodos }) => {
  const handleClick: RemoveTodoHandler = () => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };
  return (
    <button style={{ ...style.RemoveButton }} onClick={handleClick}>
      Remove
    </button>
  );
};

export default RemoveButton;
