/* ./Hook/useFetching.js */

import { useEffect } from 'react';


export default function useFetching(queryString, callbackFn) {

  useEffect(() => {
    let flag = true;
    const serverUrl = 'https://jsonplaceholder.typicode.com';

    fetch(serverUrl + queryString)
      .then((res) => res.json())
      .then((json) => {
        if (flag) callbackFn(json);
      });
    return () => {
      flag = false;
    };
  }, [queryString, callbackFn]); 
  // callbackFn 은 useCallback 을 이용한 MemorizationCallbackFn 이여야한다.
}
