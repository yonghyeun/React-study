/* ./Components/TodoTitle.js */

import { useEffect, useState } from 'react';

export default function TodoTitle({ userId }) {
  const [name, setName] = useState(null);

  useEffect(() => {
    let flag = true;
    const serverUrl = 'https://jsonplaceholder.typicode.com';

    fetch(serverUrl + `/users/${userId}`) // 쿼리문과
      .then((res) => res.json())
      .then((json) => {
        if (flag) setName(json.name); // 결과값을 처리하는 로직을 제외하곤
      }); // 모두 공통된 로직으로 공유한다

    return () => {
      flag = false;
    };
  }, [userId]);

  return <h3>{name} 의 Todo List ! </h3>;
}
