import { useLoaderData } from 'react-router-dom';

export default function Content() {
  const contentId = useLoaderData();
  return <h1>{contentId}번째 Content 에 대한 내용입니다 </h1>;
}
