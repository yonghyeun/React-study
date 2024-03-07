/* ./Components/TodoContent.js */

import { useEffect, useState } from 'react';

export default function TodoContent({ userId }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let flag = true;
    const serverUrl = 'https://jsonplaceholder.typicode.com';

    fetch(serverUrl + `/todos?userId=${userId}`)
      .then((res) => res.json())
      .then((json) => {
        if (flag) setTodos(json);
      });

    return () => {
      flag = false;
    };
  }, [userId]);

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
