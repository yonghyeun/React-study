import { useStarContext } from './ContextProvider';

export default function Stars() {
  const stars = useStarContext();

  return <div>{stars}</div>;
}
