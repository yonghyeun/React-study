import TodoInput from './TodoInput';
import TodoContent from './TodoContent';

export default function SessionSotrageTodo() {
  return (
    <article style={{ backgroundColor: '#FF5F5D' }}>
      <h1> SessionSotrageTodo</h1>
      <TodoContent storageName='sessionStorage' />
      <TodoInput storageName='sessionStorage' />
    </article>
  );
}
