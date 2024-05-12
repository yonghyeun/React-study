import { Suspense, useState } from 'react';
import Loading from './components/Loading.jsx';
import Content from './components/Content.jsx';

function App() {
  const [isShow, setIsShow] = useState(false);
  const handleClick = () => {
    setIsShow((prev) => !prev);
  };
  return (
    <div className='App'>
      <button onClick={handleClick}>Show the list</button>
      <hr />
      {isShow && (
        <Suspense fallback={<Loading />}>
          <Content />
        </Suspense>
      )}
    </div>
  );
}

export default App;
