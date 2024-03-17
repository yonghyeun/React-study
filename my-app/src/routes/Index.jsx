import { useNavigate } from 'react-router-dom';
import { useLogin } from '../Context/context';

export default function Index() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useLogin();

  let userId;
  if (isLogin) {
    const cookies = document.cookie.split(';');
    const userIdCookie = cookies.find((cookie) =>
      cookie.trim().startsWith('userId='),
    );
    userId = userIdCookie.split('=')[1];
  }

  if (isLogin) {
    return (
      <section>
        <h1>반갑습니다 {userId} 님</h1>
        <p>열심히 하자</p>
      </section>
    );
  }

  return (
    <section>
      <h1>로그아웃 상태일 때 뜨는 인덱스 페이지</h1>
      <button
        onClick={() => {
          navigate('login');
        }}
      >
        로그인 하기
      </button>
    </section>
  );
}
