import TodoInput from './core/TodoInput';
import TodoContent from './core/TodoContent';

export default function LocalStorageTodo() {
  return (
    <article style={{ backgroundColor: '#3F7C85' }}>
      <h1> LocalStorageTodo</h1>
      <TodoContent storageName='localStorage' />
      <TodoInput storageName='localStorage' />
    </article>
  );
}
