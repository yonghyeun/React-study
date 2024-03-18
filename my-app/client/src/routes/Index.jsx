import { useNavigate } from 'react-router-dom';
import { useLogin, useUserInfo } from '../Context/context';

export default function Index() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useLogin();
  const [userInfo, setUserInfo] = useUserInfo();

  const handleLogout = async () => {
    try {
      const res = await fetch('/logout', { method: 'POST' });
      if (res.ok) {
        setIsLogin(false);
        setUserInfo(null);
      } else {
        alert(res.message);
      }
    } catch (e) {}
  };

  if (isLogin) {
    const userId = userInfo.userId;
    return (
      <section>
        <h1>로그인 상태일 때 뜨는 인덱스 페이지</h1>
        <h1>반갑습니다 {userId} 님</h1>
        <br />
        <p>현재 쿠키</p>
        <p>{document.cookie}</p>
        <button onClick={handleLogout}>로그아웃 하기</button>
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
