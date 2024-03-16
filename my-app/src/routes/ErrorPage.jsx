import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <main id='error-main'>
      <h1>Oops !</h1>
      <p>예기치 못한 에러가 발생했어요 ~!</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </main>
  );
}
