import { useLoaderData } from 'react-router-dom';

export function Mypage() {
  const userInfo = useLoaderData();

  const { firstName, lastName, gender, age, avatar } = userInfo;

  return (
    <section>
      <img src={avatar} alt='img' style={{ width: '200px' }} />
      <p>
        fullName :{' '}
        <i>
          {firstName} {lastName}
        </i>
      </p>
      <p>
        gender : <i>{gender}</i>
      </p>
      <p>
        age : <i>{age}</i>
      </p>
    </section>
  );
}

export async function loader() {
  const res = await fetch('/MyPage', { method: 'GET' });
  const body = await res.json();
  return body;
}
