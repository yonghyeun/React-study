또두리스트 

이번에 또 만들어봤습니다.

만드는 목적은 세션 스토리지와 로컬 스토리지를 활용하는 것에 대해서 생각하기 위함이였으나

실제로 하루 꼬박 만들면서 많이 배운 점들이 있어 기록하기 위해서 ..

> 전체 코드 : https://github.com/yonghyeun/React-study/tree/main/15.windowStorage-study

---

# 결과물을 먼저 보고 가자 
![](https://velog.velcdn.com/images/yonghyeun/post/91db7df6-5224-45cb-a6cb-ea9fa71e9935/image.gif)

결과물은 별 거 없다. 

각 `local storage , seession storage` 를 이용해 `TODOLIST` 들을 브라우저 단에 저장해두고 

이를 로컬 스토리지와 세션 스토리지의 스코프 ,  라이프 사이클 등을 실습으로 알아보는 프로젝트였다. 

# 프로젝트 구조 
![](https://velog.velcdn.com/images/yonghyeun/post/a55d9d74-80dc-42ea-be45-da009516dec2/image.png)


프로젝트 구조는 다음과 같다. 

단순하게 다음처럼 구성되어있다.

- `asset` : 프로젝트에 필요한 이미지 파일이나 스타일 관련 속성을 넣어두는 폴더 
- `components` : 컴포넌트들을 담은 폴더로 폴더 내에서 폴더 구조를 계층적으로 추가해 사용 할 수 있게 한다.
- `components - core` : 다른 컴포넌트들의 코어가 되는 컴포넌트 
- `context` : 컴포넌트들에게 전달 할 컨텍스트들을 정의해둔 폴더로 최상위 컴포넌트로 존재한다.
- `hooks` : 사용할 커스텀 훅들을 저장한 폴더이다.
- `utils` : 여러 컴포넌트에서 공통적으로 공유해 사용 할 로직이 담긴 폴더 

리액트 공식문서에서 제시하는 전통적인 프로젝트 구조로 만들어봤는데 

개인적으로 만들면서 구조를 이렇게 짜두니 확실히 컴포넌트 간 관계에 대해서 이해하기 편했다. 

다만 이런 전통적인 파일 구조를 넘어서 다양한 폴더 구조들이 있는데

이를 통해 `clean architecture` 를 구성 할 수 있다고 한다. 

프로젝트 구조에 대해서 크게 생각을 안하고 있었는데 다음번 사이드 프로젝트를 하기 전에 

클린 아키텍쳐에 대해서 , 또 컴포넌트의 의존성 등과 관련하여 전체적인 아키텍쳐에 대해 공부해봐야겠다. 

--- 

# `Storage` 다루기 

### `utils/usingStorage`

```js
// Storage는 객체 형태를 저장하는 것이 가능하지만
// 저장시에는 JSON.strantify 로 직렬화
// 조회시에는 JSON.parse 로 객체 형태로 가져와야 한다.

export const setStorageItem = (storageName, key, value) => {
  switch (storageName) {
    case 'localStorage':
      window.localStorage.setItem(key, JSON.stringify(value));
      break;
    case 'sessionStorage':
      window.sessionStorage.setItem(key, JSON.stringify(value));
      break;
    default:
      throw Error('localStorage 혹은 sessionStorage 에서 선택해주세요');
  }
};

export const removeStorageItem = (storageName, key) => {
  switch (storageName) {
    case 'localStorage':
      window.localStorage.removeItem(key);
      break;
    case 'sessionStorage':
      window.sessionStorage.removeItem(key);
      break;
    default:
      throw Error('localStorage 혹은 sessionStorage 에서 선택해주세요');
  }
};

export const getStorageItems = (storageName) => {
  switch (storageName) {
    case 'localStorage':
      const localStorageItems = Object.values({ ...window.localStorage }).map(
        (todoString) => JSON.parse(todoString),
      );
      return localStorageItems.toSorted(
        (todo, nextTodo) => todo.id - nextTodo.id,
      );

    case 'sessionStorage':
      const sessionStorageItems = Object.values({
        ...window.sessionStorage,
      }).map((todoString) => JSON.parse(todoString));

      return sessionStorageItems.toSorted(
        (todo, nextTodo) => todo.id - nextTodo.id,
      );

    default:
      throw Error('localStorage 혹은 sessionStorage 에서 선택해주세요');
  }
};
```

`usingStorage` 에서는 `Storage` 객체를 이용하는 다양한 함수들을 모아놨다. 

각 함수는 그저 단순하게 사용할 `Stroage` 이름을 받아 고유한 메소등을 이용해 

값을 저장 , 삭제 , 조회 하는 정도이다.

다만 `usingStorage` 파일을 만들며 조금 신경썻던 부분이 두 가지 있다.

하나는 __조건적으로 무엇인가를 하고 싶을 때에는 `if/else` 를 이용했는데 이번에는 `switch` 문을 이용해봤다. __

개인적으로는 `swicth` 문이 좀 더 깔끔하고 에러 핸들링 하기에 더 편한 느낌이 든다. 

다만 각 `case` 별로 `return` 문과 같이 각 케이스가 끝나지 않는 경우 `case` 별로 `break` 를 모두 적어줘야하는 부분이 못생긴 거 같기는 한데 

나는 스위치문이 더 코드가 읽기 편하고 관리하기 편한 것 같다. 

코드 줄이 늘어난다는 단점이 존재하기는 하지만 말이다. 

두 번째는 __`getStorageItems` 함수에서 `key` 값으로 순서를 보장하며 가져오기 위해서 `toSorted`를 사용한 부분이다.__

`toSorted` 는 2023년부터 모든 브라우저들에서 사용 가능하게 된 메소드로 `sorted` 와 동일하게 작동하지만 원본 배열을 변화시키지 않는다는 장점이 있다.   

`usingStorage` 파일에 존재하는 함수들을 이용해 `Storage` 객체를 다루도록 하고 

`state` 로 정의된 `ToDoList` 들과 `Storage` 객체가 대응 되도록 한다. 

---- 

# 전체 컴포넌트에서 사용 할 `Context` 정의

### `context/Context.js`
```jsx
import { createContext, useState } from 'react';
import { getStorageItems } from '../utils/usingStorage';
export const LocalStorageContext = createContext(null);
export const SessionStorageContext = createContext(null);

/**
 * 각 Context.Provider 들은 Storage에 저장된 값을 객체형태로 받아 배열에 담아 전달해줌
 * @param {children} Context.Provider 들에게 값을 받을 하위 컴포넌트들
 * @returns
 */
export function ContextProvider({ children }) {
  const [localTodo, setLocalTodo] = useState(getStorageItems('localStorage'));
  const [sessionTodo, setSessionTodo] = useState(
    getStorageItems('sessionStorage'),
  );

  return (
    <LocalStorageContext.Provider value={[localTodo, setLocalTodo]}>
      <SessionStorageContext.Provider value={[sessionTodo, setSessionTodo]}>
        {children}
      </SessionStorageContext.Provider>
    </LocalStorageContext.Provider>
  );
}
```

전역적으로 제공 할 `localTodo , sessionTodo` 등을 정의해주고 `Context.Provider` 를 이용해 컴포넌트들에게 내려주도록 했다. 

초기 렌더링 될 때 `useState` 자체에서 각 `Storage` 에서 값을 가져와 사용하게 하여 

이전에 이용하여 `Storage`에 정보가 존재하며 전체적인 컴포넌트가 최초로 마운트 될 때 (페이지를 새롭게 리로드 하거나 새롭게 접속했을 때)

저장되어 있는 값들을 가져와 `state` 를 정의하게 하였다.

---
# `customHook` 을 정의하여 `Context` 에 담긴 값 조건적으로 가져오기 

### `hooks/useDynamicStorage`
```jsx
import { useContext } from 'react';
import { LocalStorageContext, SessionStorageContext } from '../context/Context';

export default function useDynamicStorage(storageName) {
  const localState = useContext(LocalStorageContext);
  const sessionState = useContext(SessionStorageContext);

  return storageName === 'localStorage' ? localState : sessionState;
}
```

`storageName` 을 인수로 받아 조건적으로 상위 컨텍스트에서 정의된 `state` 들을 내려주는 커스텀 훅이다.

조건적으로 `state` 를 내려주기 위해서 어떻게 해야하나 처음에는 감을 잘 못잡았다.

`Hook` 들은 조건적으로 호출되면 안되기 때문이다.

그래서 그냥 조건 없이 모두 호출해놓고 조건에 따라 `state` 들을 반환하도록 하였다. 

---

# `TodoInput`

### `components/core/Todoinput`
```jsx
import { useRef } from 'react';
import useDynamicStorage from '../../hooks/useDynamicStorage';
import { setStorageItem } from '../../utils/usingStorage';

/**
 * TodoInput 은 param 으로 받은 storageName에 따라 추가되는 todo 값을 webStorage에 저장합니다.
 * @param {{storageName : String}} 저장에 사용할 webStorage 의 이름
 * @returns {JSX.Element}
 */
export default function TodoInput({ storageName }) {
  const [state, setState] = useDynamicStorage(storageName);
  const inputRef = useRef(null);
  const createTime = new Date();

  const handleClick = () => {
    const newTodo = {
      id: createTime.getTime(),
      content: inputRef.current.value,
      createTime: createTime.toDateString(),
    };

    setState([...state, newTodo]); // state 설정
    setStorageItem(storageName, newTodo.id, newTodo); // storage 설정

    inputRef.current.value = '';
    inputRef.current.focus();
  };

  return (
    <div>
      <input type='text' ref={inputRef} />
      <button onClick={handleClick}>Set Todo</button>
    </div>
  );
}
```

`TodoInput` 컴포넌트는 `storageName` 을 `props` 로 받아 적절한 `storage` 와 연동되는 `state` 를 가지는 컴포넌트들이다. 

`button` 엘리먼트가 클릭되는 순간 `handleClick` 함수가 호출되어 `newTodo` 객체가 `state , storage` 에 모두 저장되도록 하였다. 

이번에 특히 신경썼던 부분은 불필요한 재렌더링을 피하기 위해 `useRef` 를 사용했다는 것이다.

맨 처음에는 `input` 에 적히는 값들을 추가로 `state` 로 정의해줬었다.

![](https://velog.velcdn.com/images/yonghyeun/post/da0505e6-912a-4cf2-bb24-ffd20ab2449c/image.png)

다만 이렇게 하니 `input` 값에 글자가 적힐 때 마다 `text state` 가 변경되어 렌더링이 계속 일어나더라

`input` 값에 적히는 값들은 굳이 리액트의 `state` 로 정의해주지 않더라도 브라우저 단에서 

`input.value` 값으로 동기화 되기 때문에 `state` 를 치우고 `useRef` 을 이용해 `input` 값과 매칭 시켜주었다.

```js
	...
  const createTime = new Date();
	...
  const handleClick = () => {
    const newTodo = {
      id: createTime.getTime(), // id 값은 유일하게 생성되는 createTime 을 이용
      content: inputRef.current.value,
      createTime: createTime.toDateString(),
    };
```
    
각 `todo` 객체들은 모두 유일한 식별자이며 정렬의 기준이 되는 `id` 를 갖기 위해 `createTime` 값을 가지도록 하였다. 

`state` 로 정의된 투두 리스트들은 새로운 값이 추가 될 때 마다 배열에 차곡 차곡 쌓이기 때문에 크게 문제가 없지만

정렬의 기준이 되는 `id` 값을 가지게 한 것은 `Storage` 에서 값을 가져 올 때 정렬한채로 가져오기 위함이였다.

![](https://velog.velcdn.com/images/yonghyeun/post/e7b646f6-d145-4a7d-8639-43e3f5f130f3/image.png)


사실 맨 처음에는 `id` 값을 설정하기 위해 `const idRef = useRef(0)` 으로 설정한 후 `newTodo` 가 생성될 때 마다 선형적으로 증가하는 `id` 값을 가지게 했었다.  

이는 페이지가 새로고침되는 등으로 인해 컴포넌트들이 모두 `unmount -> mount` 될 때 `idRef`  값이 모두 `0` 으로 초기화 됨에 따라 

충돌하더라 

그래서 컴포넌트의 생명주기와 상관없이 유일하면서 선형적인 관계를 갖는 생성 시간을 `id` 로 이용해주었다.

----

# `TodoContent`

### `components/core/TodoContent`
```jsx
import useDynamicStorage from '../../hooks/useDynamicStorage';
import { removeStorageItem } from '../../utils/usingStorage';

export default function TodoContent({ storageName }) {
  const [state, setState] = useDynamicStorage(storageName);

  function handleDelete(e) {
    const idWillRemove = e.target.dataset.id;
    setState(state.filter(({ id }) => id !== Number(idWillRemove)));
    removeStorageItem(storageName, idWillRemove);
  }

  return (
    <ul>
      {state.map((todo) => {
        return (
          <li key={todo.id}>
            <b>{todo.content}</b>
            <i>{todo.createTime}</i>
            <button data-id={todo.id} onClick={handleDelete}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
}
```

`TodoContent` 컴포넌트는 `storageName` 을 `props` 를 인수로 받아 렌더링 된다. 

`Delete` 버튼에 `handleDelete` 이벤트 핸들러를 부착해줌으로서 `state,  Storage` 간의 매칭을 시켜주었다. 

이 때 `button` 이 `todo` 의 `id` 값을 기억하도록 `dataset` 어트리뷰트를 이용해주었다.

---

# `LocalStorageTodo , SessionStorageTodo` 컴포넌트 조립

`core` 에 정의된 `TodoInput , TodoContent` 를 조립하여 각 컴포넌트를 만들어주었다.

### `components/LocalStorageTodo`
```jsx
import TodoInput from './core/TodoInput';
import TodoContent from './core/TodoContent';

export default function LocalStorageTodo() {
  return (
    <article style={{ backgroundColor: '#3F7C85' }}>
      <h1> LocalStorageTodo</h1>
      <TodoContent storageName='localStorage' />
      <TodoInput storageName='localStorage' />
    </article>
  );
}
```
### `components/SessionStorageTodo`
```jsx
import TodoInput from './core/TodoInput';
import TodoContent from './core/TodoContent';

export default function SessionStorageTodo() {
  return (
    <article style={{ backgroundColor: '#FF5F5D' }}>
      <h1> SessionStorageTodo</h1>
      <TodoContent storageName='sessionStorage' />
      <TodoInput storageName='sessionStorage' />
    </article>
  );
}
```

### `components/App`
```jsx
import { ContextProvider } from '../context/Context';
import LocalStorageTodo from './localStorageTodo';
import SessionStorageTodo from './sessionStorageTodo';
import '../assets/App.css';

function App() {
  return (
    <main>
      <ContextProvider>
        <LocalStorageTodo />
        <SessionStorageTodo />
      </ContextProvider>
    </main>
  );
}

export default App;
```

### `index.js` (엔트리 파일)
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

---

# 결과물

![](https://velog.velcdn.com/images/yonghyeun/post/31d6f29e-be2d-4769-9a9f-8e6acc725470/image.gif)

호호호 `SessionStorageTodo` 는 역시 `sessionStorage` 를 사용하니까 탭별로 서로 다른 `Storage` 스코프를 가지기 때문에 공유가 안되는군

처음 의도로는 `Storage` 를 다루는 방법에 대해서 배워보려고 했었는데 

하다보니 좀 더 코어적인 부분들을 이해하기 좋았다. 
