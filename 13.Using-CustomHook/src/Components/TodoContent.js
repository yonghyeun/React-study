/* ./Components/TodoContent.js */

import { useState, useCallback } from 'react';
import useFetching from '../Hook/useFetching';

export default function TodoContent({ userId }) {
  const [todos, setTodos] = useState([]);
  const memorizedSetTodos = useCallback((res) => {
    setTodos(res);
  }, []);

  useFetching(`/todos?userId=${userId}`, memorizedSetTodos);

  return (
    <ul>
      {todos.map(({ id, title, completed }) => {
        return (
          <li
            key={id}
            style={{ textDecoration: completed ? 'line-through' : null }}
          >
            {title}
          </li>
        );
      })}
    </ul>
  );
}
