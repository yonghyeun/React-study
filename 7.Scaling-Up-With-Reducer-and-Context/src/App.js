import './App.css';

import TodoList from './Components/TodoList.js';
import TodoHeader from './Components/TodoHeader.js';
import { TaskProvider } from './core/TaskContext.js';

export default function App() {
  return (
    <>
      <h1>To Do List</h1>
      <TaskProvider>
        <TodoHeader />
        <TodoList />
      </TaskProvider>
    </>
  );
}
