import { useNavigate } from 'react-router-dom';
import { useLogin } from '../Context/context';
import { getCookie, removeCookie } from '../function';

export default function Index() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useLogin();

  if (isLogin) {
    const userId = getCookie('userId');
    return (
      <section>
        <h1>로그인 상태일 때 뜨는 인덱스 페이지</h1>
        <h1>반갑습니다 {userId} 님</h1>
        <br />
        <p>현재 쿠키</p>
        <p>{document.cookie}</p>
        <button
          onClick={() => {
            removeCookie('userId');
            removeCookie('password');
            setIsLogin(false);
          }}
        >
          로그아웃 하기
        </button>
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
