import { useNavigate } from 'react-router-dom';

export default function Index() {
  const navigate = useNavigate();
  // TODO LoginStatus 쿠키에서 받아 사용하기
  const LoginStatus = false;
  const userId = '룰루뿅!';

  if (LoginStatus) {
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
