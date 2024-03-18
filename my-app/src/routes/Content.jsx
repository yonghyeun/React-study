import { useLoaderData } from 'react-router-dom';

export function Content() {
  const content = useLoaderData();

  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.text}</p>
    </>
  );
}

export async function loader({ params }) {
  const { contentId } = params;
  const res = await fetch(`/content/${contentId}`, { method: 'GET' });
  const body = await res.json();
  return body;
}
