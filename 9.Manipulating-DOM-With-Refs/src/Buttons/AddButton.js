import {
  useRefContext,
  useSetterContext,
  useStarContext,
} from '../ContextProvider.js';

import { flushSync } from 'react-dom';

export default function AddButton() {
  const stars = useStarContext();
  const lastStarRef = useRefContext();
  const setStars = useSetterContext();

  function handleAdd() {
    console.log(stars);

    const sliceCopied = stars.slice(0, stars.length - 1);
    setStars([
      ...sliceCopied,
      <div key={stars.length}>⭐</div>, // 이전 ref 가 붙어있던 마지막 별에서는 제거
      <div key={stars.length + 1} ref={lastStarRef}>
        ⭐
      </div>, // 새로 추가되는 JSX 객체에 ref 를 붙여주기
    ]);
  }

  return <button onClick={handleAdd}>Add Star</button>;
}
