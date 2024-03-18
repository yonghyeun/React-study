import { Form, useNavigate } from 'react-router-dom';
import { useLogin, useUserInfo } from '../Context/context';

export function Login() {
  const [isLogin, setIsLogin] = useLogin();
  const [userInfo, setUserInfo] = useUserInfo();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const body = Object.fromEntries(formData.entries());

    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    const res = await fetch('/login', request);
    const json = await res.json();

    if (!res.ok) {
      alert(json.message);
      return null;
    }
    setIsLogin(true);
    setUserInfo(json);
    navigate('/');
  };

  return (
    <>
      <h1>로그인 하기</h1>
      <Form method='post' id='form-login' onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            type='text'
            id='id'
            name='userId'
            placeholder='ID'
            autoComplete='off'
          />
          <input
            type='text'
            id='password'
            name='password'
            placeholder='Password'
            autoComplete='off'
          />
          <button type='submit'>Submit</button>
        </div>
      </Form>
    </>
  );
}
