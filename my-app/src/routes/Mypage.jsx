import { useLogin } from '../Context/context';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';

export function Mypage() {
  const [isLogin, setIsLogin] = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('1');
    if (!isLogin) navigate('/Login');
  }, [isLogin, navigate]);

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

export async function loader({ params }) {
  const { userId } = params;

  const res = await fetch(`/MyPage/${userId}`, { method: 'GET' });
  const userInfo = await res.json();
  return userInfo;
}
