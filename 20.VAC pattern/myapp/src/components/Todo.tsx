import style from '../assets/styles';
import RemoveButton from './RemoveButton';

export type TodoType = {
  id: number;
  content: string;
};

type Props = {
  todo: TodoType;
  setTodos: (updateFn: (prev: TodoType[]) => TodoType[]) => void;
};

const Todo: React.FC<Props> = ({ todo, setTodos }) => {
  return (
    <li style={{ ...style.Todo }}>
      {todo.content}
      <RemoveButton id={todo.id} setTodos={setTodos} />
    </li>
  );
};

export default Todo;
