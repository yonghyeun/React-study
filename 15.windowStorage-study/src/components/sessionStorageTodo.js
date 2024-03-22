import TodoInput from './TodoInput';
import TodoContent from './TodoContent';

export default function SessionStorageTodo() {
  return (
    <article style={{ backgroundColor: '#FF5F5D' }}>
      <h1> SessionStorageTodo</h1>
      <TodoContent storageName='sessionStorage' />
      <TodoInput storageName='sessionStorage' />
    </article>
  );
}
