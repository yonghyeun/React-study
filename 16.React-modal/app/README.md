# 전체 페이지 구성 하기

---

![](https://velog.velcdn.com/images/yonghyeun/post/f1a8b7d0-1baa-484d-b595-a92caed86043/image.png)

디자인을 똥같이 하는 똥손단 모집 페이지가 존재 할 때

똥손단 가입하기 버튼을 누르면

가입과 관련된 모달이 렌더링 되게 하고 싶다고 해보자

> 똥손단과 매우 걸맞는 디자인이다

```tsx
const Content: React.FC = () => {
  return (
    <main className={style.content}>
      <span>
        <TextWrapper.Title />
        <TextWrapper.Text />
      </span>
      <SignIn />
    </main>
  );
};
```

```tsx
const SignIn: React.FC = () => {
  return <button className={style.signIn}>똥손단 가입하기</button>;
};
```

현재 대부분의 내용이 존재하는 컴포넌트는 `Content` 컴포넌트이다.

# 모달창 구현하기

---

### 모달의 정의

---

모달이란 **웹 페이지의 메이논텐츠 위에 중첩되어 표시되는 창이나 대화 상자를 의미한다.**

모달을 사용 할 때엔 모달 내용에 집중하도록 하기 위해 기존 인터페이스와의 상호작용을 일시적으로 차단하며 주로 알림, 폼 입력 또는 중요한 정보를 전달 할 때 사용한다.

### 모달의 주요 특징

---

- 중첩된 구조 : 주요 콘텐츠 위에 표시되며 , 다른 내용은 흐린 효과나 어두운 덮개로 가려지게 된다.

  > 중첩된 구조를 표현하기 위해 `CSS` 속성인 `position : absoulte` 를 사용하며, 다른 내용에는 `background-color` 를 변경해준다.

- 상호작용 차단 : 모달창이 콘텐츠 위에서 제거되기 전까진 모달에 집중 할 수 있도록 모달 외의 다른 부분의 상호작용을 막아놔야 한다.

- 주목성 : 모달은 사용자의 주의를 즉각적으로 끌어야 한다.
- 동적 사용성 : 모달은 필요에 따라 동적으로 생성되고 제거되어야 한다.

## 모달 디자인 하기

---

위의 정의와 특징에 맞게 모달을 디자인 해보자

```tsx
const Modal: React.FC = () => {
  return (
    <form action='/'>
      <div className={style.group}>
        <input
          type='text'
          id='username'
          name='username'
          placeholder='아이디를 입력하세요'
        />
      </div>
      <div className={style.group}>
        <input
          type='text'
          id='password'
          name='password'
          placeholder='비밀번호를 입력하세요'
        />
      </div>
      <div className={style.buttonWrapper}>
        <button className={style.submit}>제출하기</button>
        <button className={style.submit}>취소</button>
      </div>
    </form>
  );
};
```

```css
form {
  ...
  position: absolute;
  left: 600px;
  top: 200px;
...
}
```

우선 다음과 같이 모달 컴포넌트를 생성해주고 `Content` 컴포넌트 내부에서 `Modal` 컴포넌트를 호출하자

화면 중앙부에 위치 할 수 있도록 `position : absolute` 를 주고 `top , left` 속성을 만져주었다.

```tsx
const Content: React.FC = () => {
  return (
    <main className={style.content}>
      <span>
        <TextWrapper.Title />
        <TextWrapper.Text />
      </span>
      <SignIn />
      <Modal />
    </main>
  );
};
```

![](https://velog.velcdn.com/images/yonghyeun/post/ab873c2c-8bac-4e31-8891-41cf5c1f722e/image.png)

> 과연 똥손단에 걸맞는 어마무시한 디자인이다

디자인은 끝났고, 기능을 구현해야 한다.

## 모달창 기능 구현

---

### 모달창 열기

---

모달창의 가장 주된 기능은 경우에 따라 열고 닫혀야 한다.

이를 리액트스럽게 이야기 한다면

특정 상태에 따라 렌더링 되기도 하고 , 렌더링 되지 않아야 한다.

이를 구현하기 위해 `state` 를 추가해주도록 하자

```tsx
const Content: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

```

이제 `isOpen` 에 따라 `Modal` 창을 화면에 렌더링 할지, 렌더링 하지 않을지 결정해주면 된다.

이 때 `isOpen` 값에 따라 `Modal` 창을 렌더링 하는 방법은 두 가지가 존재한다.

두 가지 방법을 소개 하기 전 공통적으로 해야하는 로직이 존재한다.

`isOpen` 의 상태를 변경 시킬 이벤트 핸들러를 부착해주는 것이다.

```tsx
type Props = {
  setIsOpen: (isOpen: boolean) => void;
};

const SignIn: React.FC<Props> = ({ setIsOpen }) => {
  // SignIn 에서 useState 의 setter function 을 props 로 받음
  const handleClick = () => {
    // 해당 버튼이 눌리면 isOepn 을 true 로 변경
    setIsOpen(true);
  };

  return (
    <button className={style.signIn} onClick={handleClick}>
      똥손단 가입하기
    </button>
  );
};
```

```tsx
const Content: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <main className={style.content}>
      <span>
        <TextWrapper.Title />
        <TextWrapper.Text />
      </span>
      <SignIn setIsOpen={setIsOpen} />
      ...
```

`isOpen` 의 상태를 변경 할 수 있도록 버튼에 이벤트 핸들러를 부착해주자

### `isOpen` 값에 따라 모달창을 렌더링 하는 2가지 방법

#### `isOpen` 로직을 `Modal` 내부에서 처리하는 방법

```tsx
const Content: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <main className={style.content}>
      <span>
        <TextWrapper.Title />
        <TextWrapper.Text />
      </span>
      <SignIn setIsOpen={setIsOpen} />
      <Modal isOpen={isOpen} /> // props 로 isOpen 을 건내줌
    </main>
  );
};
```

```tsx
type Props = {
  isOpen: boolean;
};

const Modal: React.FC<Props> = ({ isOpen }) => {
  if (isOpen) {
    return <form action='/'>// ... 생략</form>;
  } else {
    return null;
  }
};
```

`Modal` 창에서 `props` 로 `isOpen` 값을 받아 값에 따라

반환하는 값을 다르게 하는 것이다.

#### `isOpen` 로직을 `Modal` 외부에서 처리하서 방법

다른 방법은 `props` 로 넘겨줘 `Modal` 내부에서 로직을 처리하는 것이 아니라

외부에서 처리하는 방법이 존재한다.

```tsx
const Content: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <main className={style.content}>
      <span>
        <TextWrapper.Title />
        <TextWrapper.Text />
      </span>
      <SignIn setIsOpen={setIsOpen} />
      // isOpen 일 만 Modal 컴포넌트가 호출되도록 변경
      {isOpen && <Modal />}
    </main>
  );
};
```

`&&` 를 이용하여 조건부 렌더링을 이용하는 방식이다.

나는 조건부 렌더링 방식을 더 선호하기 때문에 조건부 렌더링 방식을 이용하도록 하겠다.

`props` 로 이것 저것 넘겨주다 보면 확장성이 낮아질 수 있다고 생각하기 때문이다.

![](https://velog.velcdn.com/images/yonghyeun/post/e3f46bff-b97d-41ec-8349-f29e038bfd5c/image.gif)

둘 중 어느 방법을 사용하든 결과는 같다.

`IsOpen` 상태를 `true` 로 변경하면 모달창은 렌더링 된다.

### 모달창 닫기

---

현재는 `isOpen` 을 `true` 로 변경해줌으로서 모달창을 여는 것까지 가능했다.

그럼 이제 `isOpen` 을 `false` 로 바꿔 모달창을 닫을 수 있도록 해보자

```tsx
const Content: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <main className={style.content}>
      <span>
        <TextWrapper.Title />
        <TextWrapper.Text />
      </span>
      <SignIn setIsOpen={setIsOpen} />
      // props 로 setIsOpen 을 건내줌
      {isOpen && <Modal setIsOpen={setIsOpen} />}
    </main>
  );
};
```

```tsx
type Props = {
  setIsOpen: (isOpen: boolean) => void;
};

const Modal: React.FC<Props> = ({ setIsOpen }) => {
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Submit 을 하는 어떤 로직들 ..
    setIsOpen(false);
  };

  const handleCancle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(false);
  };

  return (
    <form action='/'>
      //  ... 생략
      </div>
      <div className={style.buttonWrapper}>
        <button className={style.submit} onClick={handleSubmit}>
          제출하기
        </button>
        <button className={style.submit} onClick={handleCancle}>
          취소
        </button>
      </div>
    </form>
  );
};
```

`Modal` 내부에서 `IsOpen` 을 `false` 로 변경 시킬 수 있도록

`setIsOpen` 을 `props` 로 받은 후 이벤트 핸들러로 부착해주도록 하자

![](https://velog.velcdn.com/images/yonghyeun/post/611fc958-5b4a-4060-b3cf-0df3accddde9/image.gif)

이를 통해 제출 , 취소 버튼이 눌리면 모달창 렌더링에 영향을 미치는 상태 값인 `isOpen` 값을 `false` 로 변경해줌으로서 모달창을 닫을 수 있다.

### 모달창 주변 화면 흐리게 하기

현재의 상태에선 모달이 등장했을 때

모달창에 집중되지 않는다.

주변의 `UI` 가 여전히 너무 잘 보이기 때문이다.

이에 주변 화면이 흐려지게 되도록 모달창을 수정해보자

```jsx
type Props = {
  setIsOpen: (isOpen: boolean) => void,
};

const Modal: React.FC<Props> = ({ setIsOpen }) => {
  // 생략
  return (
    // Modal 창을 감싸는 modalWrapper 태그 생성
    <section className={style.modalWrapper}>
      <form action='/'>// 생략</form>
    </section>
  );
};
```

```css
.modalWrapper {
  /* 뷰포트 전체를 채우도록 생성 */
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  /* 흐린 배경색 설정  */
  background: transparent;
  backdrop-filter: blur(10px);
}
```

모달창을 감싸는 `modalWrapper` 를 생성하고 `modalWrapper` 가 뷰포트를 모두 감싸도록 생성해준다.

이후 `background , backdrop-filter` 등 스타일 속성을 이용해 흐린 화면을 만들어준다.

![](https://velog.velcdn.com/images/yonghyeun/post/96ace348-976d-4ce6-818e-f6aca06b83e0/image.gif)

### 모달창 제외 부분을 클릭하면 모달창이 닫히게 만들기

현재는 모달창 내부에 존재하는 제출하기 , 취소 버튼 중 하나를 눌러야만 모달창이 닫힌다.

좀 더 편하게 할 수 있도록 모달창의 외부를 클릭해도 모달이 닫힐 수 있도록 변경해보자

```tsx
const Modal: React.FC<Props> = ({ setIsOpen }) => {
  // ... 생략

  const formRef = useRef<HTMLFormElement>(null);
  const handleClickWrapper = (e: React.MouseEvent<HTMLOptionElement>) => {
    // 1. formRef.current 가 null 이 아니고 (mount 이후)
    // 2. 눌린 e.target 이 formRef.current 내부 엘리먼트가 아니라면
    if (formRef.current && !formRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  return (
    <section className={style.modalWrapper} onClick={handleClickWrapper}>
      <form action='/' ref={formRef}> // ref 등록
  ...
```

다음과 같이 `useRef` 를 이용해 모달 외부의 곳을 클릭하면

`isOpen` 값이 `false` 가 되도록 변경하여 모달을 닫는 것이 가능하다.

![](https://velog.velcdn.com/images/yonghyeun/post/648f7c13-5732-47a0-a748-583ce8ab304d/image.gif)

이는 작동하는데 전혀 문제가 없지만 여전히 아쉬운 점들이 존재한다.

이는 내일 더 추가로 공부하고 진행하도록 하겠다.
