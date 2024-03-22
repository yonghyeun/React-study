import { ContextProvider } from '../context/Context';
import LocalStorageTodo from './localStorageTodo';
import SessionStorageTodo from './sessionStorageTodo';
import '../assets/App.css';

function App() {
  return (
    <main>
      <ContextProvider>
        <LocalStorageTodo />
        <SessionStorageTodo />
      </ContextProvider>
    </main>
  );
}

export default App;
