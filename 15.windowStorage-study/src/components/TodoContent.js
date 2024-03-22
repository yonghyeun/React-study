import useDynamicStorage from '../hooks/useDynamicStorage';
import { removeStorageItem } from '../utils/usingStorage';

export default function TodoContent({ storageName }) {
  const [state, setState] = useDynamicStorage(storageName);

  function handleDelete(e) {
    const idWillRemove = e.target.dataset.id;
    setState(state.filter(({ id }) => id !== Number(idWillRemove)));
    removeStorageItem(storageName, idWillRemove);
  }

  return (
    <ul>
      {state.map((todo) => {
        return (
          <li key={todo.id}>
            <b>{todo.content}</b>
            <i>{todo.createTime}</i>
            <button
              data-id={todo.id}
              data-content={todo.content}
              onClick={handleDelete}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
}
