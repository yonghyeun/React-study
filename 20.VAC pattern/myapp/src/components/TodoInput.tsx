import { TodoType } from './Todo';
import style from '../assets/styles';
import { ChangeEvent } from 'react';

type Props = {
  text: string;
  setText: (newText: string) => void;
  todos: TodoType[];
  setTodos: (newTodos: TodoType[]) => void;
};

type TextChangeHandler = (event: ChangeEvent<HTMLInputElement>) => void;
type TodosAddHandler = () => void;

const TodoInput: React.FC<Props> = ({ text, todos, setText, setTodos }) => {

  const handleChange: TextChangeHandler = (e) => setText(e.target.value);

  const handleClick: TodosAddHandler = () => {
    setTodos([...todos, { id: todos.length, content: text }]);
  };

  return (
    <section>
      <input
        style={{ ...style.TodoInput }}
        type='text'
        onChange={handleChange}
      />
      <button onClick={handleClick}>add</button>
    </section>
  );
};

export default TodoInput;
