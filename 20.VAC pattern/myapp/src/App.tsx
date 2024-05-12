import { useState } from 'react';
import { TodoType } from './components/Todo';

import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [todos, setTodos] = useState<TodoType[]>([]);

  return (
    <div className='App'>
      <TodoInput
        text={text}
        todos={todos}
        setText={setText}
        setTodos={setTodos}
      />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
