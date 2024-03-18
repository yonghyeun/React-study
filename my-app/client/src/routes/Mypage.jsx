import { useLogin, useUserInfo } from '../Context/context';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function Mypage() {
  const [isLogin, setIsLogin] = useLogin();
  const [userInfo, setUserInfo] = useUserInfo();
  const { firstName, lastName, gender, age, avatar } = userInfo;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) navigate('/Login');
  }, [isLogin, navigate]);

  if (!userInfo) return null;

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
