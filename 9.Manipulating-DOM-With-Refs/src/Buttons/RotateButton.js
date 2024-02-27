import { useRefContext } from '../ContextProvider.js';

export default function RotateButton() {
  const lastStarRef = useRefContext();

  function handleRotate() {
    const lastStar = lastStarRef.current;

    setTimeout(() => {
      lastStar.classList.remove('rotation');
    }, 1000);
    lastStar.classList.add('rotation');
  }

  return <button onClick={handleRotate}>rotate last Star !</button>;
}
