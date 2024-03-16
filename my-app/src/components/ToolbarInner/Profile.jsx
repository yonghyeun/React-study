import { useNavigate } from 'react-router-dom';

export default function Profile() {
  //TODO LoginStatus 쿠키에서 받아와서 사용하기
  // TODO 쿠키에서 아이디 받아와서 해당 아이디의 정보를 서버에서 받아오기
  const LoginStatus = true;

  const navigate = useNavigate();

  function handleLogin() {
    if (LoginStatus) navigate('/mypage');
    else navigate('/login');
  }

  return <button onClick={handleLogin}>User</button>;
}
