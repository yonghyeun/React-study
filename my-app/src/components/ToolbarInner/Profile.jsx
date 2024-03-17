import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../Context/context';
import { getCookie } from '../../function';

export default function Profile() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useLogin();
  function handleClick() {
    const userId = getCookie('userId');
    const destination = isLogin ? `/MyPage/${userId}` : 'Login';

    navigate(destination);
  }

  return <button onClick={handleClick}>{isLogin ? 'MyPage' : 'Login'}</button>;
}
