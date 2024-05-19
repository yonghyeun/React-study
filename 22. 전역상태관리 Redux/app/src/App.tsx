import { Provider } from 'react-redux';
import Counter from './Counter/Counter';
import store from 'store/store';

import './App.css';
function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <Counter />
      </Provider>
    </div>
  );
}

export default App;
