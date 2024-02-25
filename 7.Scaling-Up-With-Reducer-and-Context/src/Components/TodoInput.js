import { useDispatch } from '../core/TaskContext';
import { useState } from 'react';
import Button from './Button';

export default function TodoInput({ task }) {
  const dispatch = useDispatch();

  const [localText, setLocalText] = useState(task.content);
  function dispatchSave(targetId, newContent) {
    dispatch({
      type: 'save',
      targetId,
      newContent,
    });
  }

  return (
    <>
      <input
        type='text'
        onChange={(e) => {
          setLocalText(e.target.value);
        }}
        value={localText}
      />
      <Button
        onClick={() => {
          dispatchSave(task.id, localText);
        }}
      >
        Save
      </Button>
    </>
  );
}
