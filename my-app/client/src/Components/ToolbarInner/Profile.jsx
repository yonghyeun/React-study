import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../Context/context';
import { getCookie } from '../../function';

export default function Profile() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useLogin();

  return (
    <button
      onClick={() => {
        if (isLogin) navigate('/Mypage');
        else navigate('/login');
      }}
    >
      MyPage
    </button>
  );
}
