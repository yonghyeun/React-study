import { Form } from 'react-router-dom';
import { useLogin } from '../../Context/context';
export default function Profile() {
  const [isLogin, setIsLogin] = useLogin();

  let userId;
  const cookies = document.cookie.split(';');
  if (isLogin) {
    const userIdCookie = cookies.find((cookie) =>
      cookie.trim().startsWith('userId='),
    );
    if (userIdCookie) userId = userIdCookie.split('=')[1];
  }

  return (
    <Form method='get' action={isLogin ? `/MyPage/:${userId}` : 'Login'}>
      <button>{isLogin ? 'MyPage' : 'Login'}</button>
    </Form>
  );
}
