import { ContextProvider } from './ContextProvider.js';
import Stars from './Stars.js';
import AllButtons from './Buttons/AllButtons.js';

import './App.css';

export default function App() {
  return (
    <ContextProvider>
      <Stars />
      <AllButtons />
    </ContextProvider>
  );
}
