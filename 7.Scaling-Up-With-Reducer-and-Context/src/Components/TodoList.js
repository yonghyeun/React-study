import TodoText from './ToDoText';
import TodoInput from './TodoInput';
import Button from './Button';
import { useDispatch, useTask } from '../core/TaskContext';

export default function TodoList() {
  const tasks = useTask();
  const dispatch = useDispatch();

  if (!tasks) return;

  function dispatchRemove(targetId) {
    dispatch({
      type: 'remove',
      targetId,
    });
  }

  return (
    <>
      {tasks.map((task) => {
        return (
          <div key={task.id} className='container'>
            {task.isEdit ? (
              <TodoInput key={task.id} task={task} />
            ) : (
              <TodoText key={task.id} task={task} />
            )}
            <Button
              onClick={() => {
                dispatchRemove(task.id);
              }}
            >
              Remove
            </Button>
          </div>
        );
      })}
    </>
  );
}
