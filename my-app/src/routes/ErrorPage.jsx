import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <h1> Oops!</h1>
      <p>예기치못한 에러가 발생했음</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
