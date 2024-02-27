import {
  useRefContext,
  useSetterContext,
  useStarContext,
} from '../ContextProvider.js';

export default function RemoveButtonV() {
  const stars = useStarContext();
  const setStars = useSetterContext();
  const lastStarRef = useRefContext();

  function handleRemoveV() {
    const sliceCopied = stars.slice(0, stars.length - 2);
    setStars([
      ...sliceCopied,
      <div key={sliceCopied.length + 1} ref={lastStarRef}>
        ⭐
      </div>,
    ]);
  }

  return (
    <button onClick={handleRemoveV}>Remove last Star by Virtual DOM</button>
  );
}
