import { useRefContext } from '../ContextProvider.js';

export default function RemoveButtonA() {
  const lastStarRef = useRefContext();

  function handleRemoveA() {
    // ActualDOM 의 API로 Actual DOM 에서 해당 노드를 삭제함
    lastStarRef.current.remove();
  }

  return (
    <button onClick={handleRemoveA}>Remove last Star by Actual DOM</button>
  );
}
