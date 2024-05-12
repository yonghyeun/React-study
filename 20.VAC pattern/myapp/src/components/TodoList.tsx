import { TodoType } from './Todo';
import Todo from './Todo';

import style from '../assets/styles';

type Props = {
  todos: TodoType[];
  setTodos: (updateFn: (prev: TodoType[]) => TodoType[]) => void;
};

const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  return (
    <ul style={{ ...style.TodoList }}>
      {todos.map((todo) => (
        <Todo todo={todo} setTodos={setTodos} />
      ))}
    </ul>
  );
};

export default TodoList;
