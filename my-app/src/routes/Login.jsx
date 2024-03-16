import { Form, redirect } from 'react-router-dom';

export function Login() {
  return (
    <>
      <h1>로그인 하기</h1>
      <Form method='post' id='form-login'>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <input type='text' id='id' name='userId' placeholder='ID' />
          <input
            type='text'
            id='password'
            name='password'
            placeholder='Password'
          />
          <button type='submit'>Submit</button>
        </div>
      </Form>
    </>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const requestBody = Object.fromEntries(formData);

  const apiDomain = 'http://localhost:2222';
  const loginEndpoint = `${apiDomain}/login`;
  const loginRequest = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  };
  try {
    const res = await fetch(loginEndpoint, loginRequest);

    if (!res.ok) {
      console.log('에러났음ㅁ');
    }
  } catch (e) {
    console.log('오류났지롱');
  }

  return null;
}
