# 알쏭 달쏭 `useEffect`

---

최근 모던 리액트 딥다이브 서적을 읽으며 리액트의 훅 들을 공부하던 중

`useEffect` 에 대한 개념을 잘 잡아준 것 같아서 다시 공부 차 작성합니다.

_이번 글을 적기 전까진 그저 `useEffect` 는 `Actual DOM` 이 업데이트 된 후에 실행되는 훅이고 .. 클린업 메소드는 컴포넌트가 언마운트 될 때 실행되고 ..._ 이런식으로만 생각했는데

왜 이름이 `useEffect` 인지도 조금 감이 오는듯 싶습니다.

# 공식문서에서 말하는 `useEffect`

---

> useEffect is a React Hook that lets you synchronize a component with an external system.

공식 문서에서는 다음과 같이 설명합니다.

`useEffect` 는 외부 환경과 동기화를 맞춰주는 훅이라고 말입니다.

## 리액트 공식문서에서 말하는 `useEffect` 의 파라미터 설명

---

밑의 설명들은 리액트 공식문서에서 제공하는 `useEffect`에 대한 설명입니다.

> **setup**: The function with your Effect’s logic. Your setup function may also optionally return a cleanup function. When your component is added to the DOM, React will run your setup function. After every re-render with changed dependencies, React will first run the cleanup function (if you provided it) with the old values, and then run your setup function with the new values. After your component is removed from the DOM, React will run your cleanup function.

`useEffect` 의 첫 번째 인수는 `setUp` 함수로 `cleanUp method` 를 반환 할 수 있다고 합니다.

공식 문서에서 말하기론 컴포넌트가 렌더링 되어 **최초로 `DOM` 에 추가된 이후 실행된다** 고 하며 , 의존성 배열에 넣은 값이 변경되었다면 `cleanUp` 메소드를 실행하고 다시 실행 된다고 합니다.

> **optional dependencies**: The list of all reactive values referenced inside of the setup code. Reactive values include props, state, and all the variables and functions declared directly inside your component body. If your linter is configured for React, it will verify that every reactive value is correctly specified as a dependency. The list of dependencies must have a constant number of items and be written inline like [dep1, dep2, dep3]. React will compare each dependency with its previous value using the Object.is comparison. If you omit this argument, your Effect will re-run after every re-render of the component. See the difference between passing an array of dependencies, an empty array, and no dependencies at all.

두 번째 매개변수는 `dependencies` 배열을 넣을 수 있다고 하는데 해당 의존성 배열에는 변경 가능한 어떤 값들이든 넣을 수 있다고 합니다.

리렌더링 이후 의존성 배열의 있는 값이 리렌더링 이전의 값과 얕은 비교를 통해 비교 후 다르다면 `setUp` 메소드를 재실행 한다고 합니다.

의존성 배열이 존재하지 않다면 매번 `setUp` 메소드를 실행하고 `[]` 와 같이 빈 배열이라면 `setUp` 메소드가 단 한번만 실행된다고 합니다.

공식문서에서 제공하는 설명들은 매우 객관적이고 있는 그대로를 잘 설명해줍니다.

추상적인 개념이 들어가서 설명한다면 사람마다 다르게 해석 할 수 있는 여지가 있으니 그런 것 같습니다.

다만 저는 좀 더 추상적으로 이해해보려고 합니다.

# 추상적으로 이해해보는 `useEffect`

---

해당 설명은 모던 리액트 딥다이브에서 설명한 개념을 주로 하고 , 제가 생각하는 주관적인 생각들을 조금 담았습니다.

## `useEffect` 는 왜 `Effect` 일까 ?

`useEffect` 는 왜 `Effect` 일까요 ?

공식 문서상의 요약본 설명은 외부 환경과 동기화를 해주기 위해 사용한다고 하는데 그렇다면 `useSynchronize` 와 같은 이름이여야 하지 않을까요 ?

`Effect` 가 무엇인지를 생각해보기 전 , 리액트 컴포넌트의 설계 기본 원칙을 생각해봐야 합니다.

**리액트 컴포넌트는 렌더링 시 아무런 상태도 변경하면 안된다.**

그 이유는 렌더링 시 상태를 변경 시키는 행위가 일어나게 된다면 전체적인 흐름이 추적하기 어려운 방향으로 흘러가기 때문입니다.

다만 상태를 변경시킨다는 것을 `useState` 로 정의된 상태 값을 변경 시키는 것으로 국한하지 말고

브라우저 상에 렌더링 되는 화면을 변경시키면 안된다라고 생각해봅시다.

그것도 맞는 말입니다. 갑자기 렌더링 될 때 `document.querySelector()` 로 `Actual DOM` 에 접근해서 값을 바꿔버리면 그것 또한 추적이 불가능합니다.

결국 리액트 컴포넌트는 렌더링 시 브라우저 상에 어떠한 영향도 주지 않고 , 매번 호출 시 같은 결과값을 내야 한다는 것입니다.

그렇다면 반대로 리액트의 렌더링이 브라우저에 영향을 주는 행위 , 즉 `Effect` 를 미치는 경우는 언제가 있을까요 ?

```jsx
import { useState } from 'react';

function App() {
  const [counter, setCounter] = useState(0);
  const handleClick = () => {
    setCounter(counter + 1);
  };
  return (
    <div className='App'>
      <h1>{counter}</h1>
      <button onClick={handleClick}>Click Me!</button>
    </div>
  );
}

export default App;
```

다음과 같은 간단한 카운터 컴포넌트가 있다고 생각해봅시다.

해당 컴포넌트가 렌더링이 일어 날 때 렌더링 되는 `h1` 태그는 항상 초기에 지정한 상태 값인 0이 나타납니다.

하지만 만약 버튼이 클릭된다면 어떤 일이 일어날까요 ?

`counter` 의 값이 1이 추가되고 , 컴포넌트는 변경된 `counter` 값을 가지고 다시 리렌더링 되며 브라우저엔 `1` 이 나타납니다.

컴포넌트가 다시 렌더링 될 때 브라우저에 `Effect` 를 끼쳤습니다.

```jsx
import { useState } from 'react';

function ChildComponent({ num }) {
  return <h1>{num}</h1>;
}

function App() {
  const [counter, setCounter] = useState(0);
  const handleClick = () => {
    setCounter(counter + 1);
  };
  return (
    <div className='App'>
      <h1>{counter}</h1>
      <button onClick={handleClick}>Click Me!</button>
      <ChildComponent num={counter} />
    </div>
  );
}

export default App;
```

이번에도 버튼이 눌려 부모 컴포넌트의 `counter` 값이 변경되어 `ChildComponent` 가 `props` 로 받는 값이 변경되어

`App  , ChildComponent` 모두 렌더링 되며 브라우저에 `Effect` 를 끼쳤습니다.

이번엔 또 어떨까요 ?

```jsx
function ChildComponent({ num }) {
  const isOdd = Boolean(num % 2);
  if (isOdd) {
    return <h1>{num}</h1>;
  } else {
    return <h6>{num}</h6>;
  }
}
```

이번엔 `isOdd` 값이 `props` 값에 따라 변경되며 브라우저에 띄워지는 컴포넌트가 달라졌습니다.

이처럼 `Reactive` 한 값이 존재하고 해당 값이 변경된다면 , 브라우저에 `Effect` 가 끼쳐지게 됩니다.

**즉 , `Effect` 란 `Reactive` 한 값의 변경으로 인해 발생한 영향을 의미합니다.**

## `Effect` 를 추적하기 위한 훅, `useEffect`

**`useEffect` 는 `Reactive` 한 값의 변경으로 인해 일어난 영향을 추적하기 위한 훅입니다.**

영향을 추적하기 때문에 `useEffect` 는 컴포넌트가 리렌더링이 일어나고 `Actual DOM` 이 업데이트가 일어난 이후 호출됩니다.

이렇게 이해하고 나서 다시 파라미터들을 살펴봅시다.

`useEffect` 의 의존성 배열은 추적하기 위한 `Reactive` 한 값들을 담습니다. 만약 `Reactive` 한 값이 변경되었다면 `Effect` 가 일어났을 테니, `Effect` 에 대응하기 위해 `setUp` 메소드를 시행합니다.

클린업 메소드에 대한 내용은 당장 다루지 않고 넘어가겠습니다.

```jsx
function ChildComponent({ num }) {
  const isOdd = Boolean(num % 2);

  useEffect(() => {
    console.log(isOdd ? '홀수네' : '짝수네');
  }, [isOdd]);

  if (isOdd) {
    return <h1>{num}</h1>;
  } else {
    return <h6>{num}</h6>;
  }
}
```

다음과 같은 컴포넌트에서 `useEffect` 는 `Reactive` 한 값인 `isOdd` 값에 의해 일어난 영향을 추적합니다.

일어난 영향이라고 단언 할 수 있는 이유는 `useEffect` 가 호출되는 시점이 `Actual DOM` 의 업데이트가 일어난 이후이기 때문입니다.

# 리액트에서 제공하는 `useEffect` 를 `Effect` 추적 관점에서 다시 바라보기

```jsx
import { useEffect } from 'react';
import { createConnection } from './chat.js';

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [serverUrl, roomId]);
  // ...
}
```

해당 코드는 `props` 인 `rommId` 나 `state` 인 `serverUrl` 의 값이 변경되면 서버와 연결을 시작하는 `useEffect` 를 가지고 있습니다.

이후 `setUp` 메소드로는 서버와 연결을 종료합니다.

리액트 공식문서에서 제공하는 설명을 살펴봅시다.

> When the ChatRoom component above gets added to the page, it will connect to the chat room with the initial serverUrl and roomId. If either serverUrl or roomId change as a result of a re-render (say, if the user picks a different chat room in a dropdown), **your Effect will disconnect from the previous room, and connect to the next one. When the ChatRoom component is removed from the page, your Effect will disconnect one last time.**

공식문서에서는 `useEffect` 자체를 `Effect` 로 정의하여 설명합니다만 위에서 설명했던 방식으로 위의 코드를 이해해봅시다.

```jsx
function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');
```

`ChatRoom` 컴포넌트는 `roomId , serverUrl` 이란 `Reactive` 한 값이 존재합니다.

`roomId , serverUrl` 이 변경된다면 연결하고자 하는 서버 주소가 변경되었음을 의미하고 렌더링 되는 채팅화면은 변경된 `rommId , serverUrl` 의 채팅창을 가리키고 있을 것입니다.

> 반환되는 컴포넌트에서 `h1` 태그엔 `roomId` , 그 밑에 `span` 태그엔 `serverUrl` 이 존재한다고 가정해봅시다.

브라우저에는 `Reactive` 한 값의 변경으로 인해 `Effect` 가 발생했습니다.

그럼 우리는 변경된 `Effect` 를 추적하고 , `Effect` 에 대응하기 위해서 (서버와 연결해주기 위해) `useEffect` 를 사용합니다.

```jsx
useEffect(() => {
  const connection = createConnection(serverUrl, roomId);
  connection.connect();
  return () => {
    connection.disconnect();
  };
}, [serverUrl, roomId]);
```

이제 해당 `useEffect` 는 `serverUrl , roomId` 중 값이 변경되어 발생한 `Effect` 를 추적하며 대응합니다.

사실 이제 예시는 중요하지 않습니다. `useEffect` 가 `Reative` 한 값의 변경으로 인해 일어난 `Effect` 를 추적하고 대응하기 위한 훅이라는 것의 개념만 알면 됩니다.

```jsx
import { useState, useEffect } from 'react';
import { fetchBio } from './api.js';

export default function Page() {
  const [person, setPerson] = useState('Alice');
  const [bio, setBio] = useState(null);

  useEffect(() => {
    let ignore = false;
    setBio(null);
    fetchBio(person).then(result => {
      if (!ignore) {
        setBio(result);
      }
    });
    return () => {
      ignore = true;
    };
  }, [person]);
```

위 예시도 `person` 이란 `Reactive` 한 값이 변한다면, 변화된 `Effect` 에 맞게 데이터를 패칭해옵니다.

# 클린업 메소드

클린업 메소드는 `useEffect` 내부에 존재하는 `setUp` 메소드로 인해 발생한 `Effect` 를 추적하고 처리하는 역할을 합니다.

`useEffect` 을 활용하여 `Actual DOM` 에 이벤트 핸들러를 부착하고 , 클린업 메소드로 이벤트 핸들러를 제거하는 예시를 자주 봤을겁니다.

```jsx

function ClickLogger() {
  useEffect(() => {
    const handleClick = () => {
      console.log('Document was clicked');
    };
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
```

`Actual DOM` 에 접근하기 위해 `useEffect` 를 사용한 패턴입니다.

이렇게 설정하면 `cliickLogger` 가 마운트 될 때 마다 이벤트 핸들러가 부착되고 , 언마운트 되면 이벤트 핸들러가 제거됩니다.

`cleanUp` 메소드는 `setUp` 메소드로 인해 발생한 `Effect` 를 추적하고 대응하는 모습을 볼 수 있습니다.

# 회고

---

_`useEffect` 를 `Actual DOM` 업데이트가 일어난 후 실행되는 훅이고 의존성 배열의 값이 변경되지 않았다면 실행되지 않는 훅이다._

사실 이렇게 이해하고 사용해도 쓰는데 문제가 있지는 않습니다.

하지만 저는 공부하는 입장에서 해당 포스팅의 본문처럼 이해하는 것이 더 리액트 생태계의 큰 그림을 이해하는데 있어 더 도움이 될 것 같다고 생각합니다.

적어도 저는 좀 더 넓게 이해 할 수 있게 된 것 같습니다.😻
