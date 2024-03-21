import { ContextProvider } from '../context/Context';
import LocalStorageTodo from './localStorageTodo';
import SessionSotrageTodo from './sessionStorageTodo';
import '../assets/App.css';

function App() {
  return (
    <main>
      <ContextProvider>
        <LocalStorageTodo />
        <SessionSotrageTodo />
      </ContextProvider>
    </main>
  );
}

export default App;
