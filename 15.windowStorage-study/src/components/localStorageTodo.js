import TodoInput from './TodoInput';

export default function LocalStorageTodo() {
  return (
    <article>
      <h1> LocalStorageTodo</h1>
      <TodoInput storageName='localStorage' />
    </article>
  );
}
