import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id='error-page'>
      <h1>Oops!</h1>
      <p>미안 ~ 예기치 못한 에러가 발생했어 ~!!</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
