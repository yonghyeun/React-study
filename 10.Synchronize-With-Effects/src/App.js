import { useState } from 'react';

export default function App() {
  const [num, setNum] = useState(0);
  const arr = [1, 2, 3, 4, 5];
  console.log(arr.find((item) => item === 999));

  return <div>{num}</div>;
}
