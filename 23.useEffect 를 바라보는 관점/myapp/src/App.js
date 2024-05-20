import { useEffect, useState } from 'react';

function loggingToServer(logId) {}

function SomeComponent({ logId }) {
  useEffect(() => {
    loggingToServer(logId);
  }, []);

  return <h1>{logId}</h1>;
}

function App() {
  return <div className='App'></div>;
}

export default App;
