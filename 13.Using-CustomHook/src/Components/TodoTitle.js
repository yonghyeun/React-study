/* ./Components/TodoTitle.js */
import { useState, useCallback } from 'react';
import useFetching from '../Hook/useFetching';

export default function TodoTitle({ userId }) {
  const [name, setName] = useState(null);
  const memorizedSetName = useCallback((res) => {
    setName(res.name);
  }, []);

  useFetching(`/users/${userId}`, memorizedSetName);

  return <h3>{name} 의 Todo List ! </h3>;
}
