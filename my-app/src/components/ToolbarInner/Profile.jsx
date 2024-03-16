import { Form } from 'react-router-dom';

export default function Profile() {
  // TODO LoginStatus 쿠키에서 받아와서 사용하기
  // TODO 쿠키에서 아이디 받아와서 해당 아이디의 정보를 서버에서 받아오기
  const LoginStatus = false;

  return (
    <Form method='get' action={LoginStatus ? '/MyPage' : 'Login'}>
      <button>{LoginStatus ? 'MyPage' : 'Login'}</button>
    </Form>
  );
}
