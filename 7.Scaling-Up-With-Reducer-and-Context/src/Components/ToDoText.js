import Button from './Button';
import { useDispatch } from '../core/TaskContext';

export default function TodoText({ task }) {
  const dispatch = useDispatch();

  function dispatchEdit(targetId) {
    dispatch({
      type: 'edit',
      targetId,
    });
  }

  return (
    <>
      <p>{task.content}</p>
      <Button
        onClick={() => {
          dispatchEdit(task.id);
        }}
      >
        Edit
      </Button>
    </>
  );
}
