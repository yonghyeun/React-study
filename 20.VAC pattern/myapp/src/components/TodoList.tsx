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
      {todos.map((todo, index) => (
        <Todo todo={todo} setTodos={setTodos} key={index} />
      ))}
    </ul>
  );
};

export default TodoList;
