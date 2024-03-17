import { Form, redirect } from 'react-router-dom';

export function Login() {
  return (
    <>
      <h1>로그인 하기</h1>
      <Form method='post' id='form-login'>
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

export async function action({ request }) {
  const formData = await request.formData();
  const requestBody = Object.fromEntries(formData);

  const loginRequest = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  };

  const res = await fetch('/login', loginRequest);
  const json = await res.json();
  if (!res.ok) {
    //res.status 가 200~299 가 아닐 때
    alert(`${json.message}`);
    return null; // 현재 path 에 존재하기
  }

  return redirect('/'); // 로그인이 성공했을 때에는 '/' 경로로 redirect
}
