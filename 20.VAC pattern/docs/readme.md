> 해당 내용은 해당 페이지들을 출처로 하여 작성되었다.
> https://www.npmjs.com/package/react-vac > https://wit.nts-corp.com/2021/08/11/6461

# `VAC` 패턴이란

---

`VAC` 패턴이란 데이터 , 컨트롤러 , 뷰 역할을 하는 시스템적인 아키텍쳐를 이야기 하는 디자인 패턴이라기 보다

컴포넌트의 렌더링 로직과 비즈니스 로직을 분리하기 위한

컴포넌트 설계 패턴에 가깝다.

`VAC` 는 `View Asset Component` 의 줄임말로

**철저하게 `stateless` 하게 지어져 `props` 만으로 데이터를 렌더링 하는 역할만을 하는 컴포넌트를 의미한다.**

<img src = 'https://wit.nts-corp.com/wp-content/uploads/2021/08/vac_pattern_s1.png'>

`React` 를 사용하여 컴포넌트를 생성 할 때 `JSX` 를 활용하기 때문에

자바스크립트 코드만으로도 비즈니스 로직 뿐 아니라 `View` 를 위한 로직까지 처리 할 수 있다.

이런 확장성은 초기 설계의 편리함을 가져왔지만

`View` 와 비즈니스 로직이 함께 혼재하는 역할과 책임이 불분명한 컴포넌트를 생성하여 여러 문제를 야기했다.

# 시나리오

---

기존 패턴으로 간단한 투두리스트를 만들어 보고 `VAC` 패턴으로 리팩토링 하는 과정으로 `VAC` 패턴을 익혀보자

다만 몇 가지 조건을 걸자

- 현재 협업하는 개발자는 두 명으로 `UI 개발자` 와 `FE 개발자` 가 존재한다.
- 스타일링은 `assets/style.js` 에 담긴 스타일 객체에서 빼와 사용한다. (`CSS` 사용 X)

#### `App`

```tsx
import { useState } from 'react';
import { TodoType } from './components/Todo';

import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [todos, setTodos] = useState<TodoType[]>([]);

  return (
    <div className='App'>
      <TodoInput
        text={text}
        todos={todos}
        setText={setText}
        setTodos={setTodos}
      />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
```

#### `Components/TodoInput`

```tsx
import { TodoType } from './Todo';
import style from '../assets/styles';
import { ChangeEvent } from 'react';

type Props = {
  text: string;
  setText: (newText: string) => void;
  todos: TodoType[];
  setTodos: (newTodos: TodoType[]) => void;
};

type TextChangeHandler = (event: ChangeEvent<HTMLInputElement>) => void;
type TodosAddHandler = () => void;

const TodoInput: React.FC<Props> = ({ text, todos, setText, setTodos }) => {
  const handleChange: TextChangeHandler = (e) => setText(e.target.value);

  const handleClick: TodosAddHandler = () => {
    setTodos([...todos, { id: todos.length, content: text }]);
  };

  return (
    <section>
      <input
        style={{ ...style.TodoInput }}
        type='text'
        onChange={handleChange}
      />
      <button onClick={handleClick}>add</button>
    </section>
  );
};

export default TodoInput;
```

#### `Components/TodoList`

```tsx
import { TodoType } from './Todo';
import Todo from './Todo';

import style from '../assets/styles';

type Props = {
  todos: TodoType[];
  setTodos: (updateFn: (prev: TodoType[]) => TodoType[]) => void;
};

const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  return (
    <ul style={{ ...style.TodoList }}>
      {todos.map((todo) => (
        <Todo todo={todo} setTodos={setTodos} />
      ))}
    </ul>
  );
};

export default TodoList;
```

#### `Components/Todo`

```tsx
import style from '../assets/styles';
import RemoveButton from './RemoveButton';

export type TodoType = {
  id: number;
  content: string;
};

type Props = {
  todo: TodoType;
  setTodos: (updateFn: (prev: TodoType[]) => TodoType[]) => void;
};

const Todo: React.FC<Props> = ({ todo, setTodos }) => {
  return (
    <li style={{ ...style.Todo }}>
      {todo.content}
      <RemoveButton id={todo.id} setTodos={setTodos} />
    </li>
  );
};

export default Todo;
```

#### `Components/RemoveButton`

```tsx
import { TodoType } from './Todo';
import style from '../assets/styles';

type Props = {
  id: number;
  setTodos: (updateFn: (prev: TodoType[]) => TodoType[]) => void;
};

type RemoveTodoHandler = () => void;

const RemoveButton: React.FC<Props> = ({ id, setTodos }) => {
  const handleClick: RemoveTodoHandler = () => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <button style={{ ...style.RemoveButton }} onClick={handleClick}>
      Remove
    </button>
  );
};

export default RemoveButton;
```

#### `assets/style`

```js
const style = {
  Todo: {
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '200px',
    background: 'tomato',
    color: 'white',
    fontWeight: '900',
    margin: '10px',
    borderRadius: '10px',
  },
  RemoveButton: {
    padding: '5px',
  },
  TodoList: {
    padding: '0px',
  },
  TodoInput: {
    padding: '10px',
    margin: '10px',
  },
};

export default style;
```

![alt text](image.png)

# 기존 패턴의 문제점 찾기

---

다음과 같은 컴포넌트 구성이 있을 때 생각나는 문제는 두 가지 존재한다.

**1. `assets/style.js` 에서 스타일 객체를 가져와 `HTMLElement` 의 `attrbute` 로 직접 주입하는 것은 성능 좋지 않다.**

**2. 컴포넌트 내부에 렌더링 로직과 비즈니스 로직이 혼재한다.**

예를 들어 `RemoveButton` 컴포넌트를 살펴보자

```tsx
const RemoveButton: React.FC<Props> = ({ id, setTodos }) => {
  /* 비즈니스 로직 */
  const handleClick: RemoveTodoHandler = () => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  /* 렌더링 로직 */
  return (
    <button style={{ ...style.RemoveButton }} onClick={handleClick}>
      Remove
    </button>
  );
};

export default RemoveButton;
```

한 컴포넌트 내부에 비즈니스 로직과 렌더링 로직이 함께 한다.

물론 현재의 컴포넌트는 매우 단순한 컴포넌트라 가독성이 크게 떨어지지 않으나

여전히 좋지 않은 컴포넌트 구성이며

`FE` 개발자와 `UI` 개발자의 협업시 충돌이 발생 할 수 있다.

예를 들어 `FE` 개발자가 `button onCliick` 에 들어갈 메소드를 변경하고

`UI` 개발자가 `button style` 에 들어갈 스타일 객체를 수정했다고 가정해보자

```tsx
    /* FE 개발자의 커밋과 UI 개발자의 커밋이 충돌 */
    <button style={{ ...style.RemoveButton }} onClick={handleClick}>
```

이 경우 두 개발자의 커밋이 충돌하여 문제가 발생할 수 있다.

이런 이유는 해당 컴포넌트를 관리하는 주체가 `UI , FE` 개발자 두 명이 함께 존재하기 때문이다.

# `VAC` 패턴으로 리팩토링 하기

`UI` 개발자와 `FE` 개발자가 해당 문제를 해결하기 위해 머리를 싸매고 토론하여 나온 결론은 다음과 같다.

- **`CSS in JS` 를 하기 위해 스타일드 컴포넌트를 구성하자**
- **컴포넌트 내부에서 비즈니스 로직과 스타일 로직을 구분하자**

그럼 스타일드 컴포넌트를 이용해 `VAC` 패턴을 적용해보자

#### `RemoveButton` 리팩토링

모든 컴포넌트를 리팩토링 하면 너무 글이 길어질 것 같아 한 컴포넌트만 대상으로 하여 리팩토링 해보자

```tsx
import { TodoType } from './Todo';
import styled from 'styled-components';

type Props = {
  id: number;
  setTodos: (updateFn: (prev: TodoType[]) => TodoType[]) => void;
};

/*
VAC 컴포넌트 생성
해당 VAC 컴포넌트는 단순히 props 들만 전달받아 
렌더링만 하도록 한다
UI 개발자가 책임을 맡는다.
*/
const RemoveButtonView = styled.button`
  padding: '5px';
  ...
`;

const RemoveButton: React.FC<Props> = ({ id, setTodos }) => {
  /*비즈니스 로직 처리
  FE 개발자가 책임을 맡는다.
  */
  const handleClick = () => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  /*렌더링 로직은 VAC 에게 전달*/
  return <RemoveButtonView onClick={handleClick}>Remove</RemoveButtonView>;
};

export default RemoveButton;
```

기존 `RemoveButton` 컴포넌트에서 변경된 점은 `RemoveButton` 컴포넌트가 `RemoveButtonView` 컴포넌트를 반환한다는 점이다.

이는 한 컴포넌트를 비즈니스 로직만을 다루는`RemoveButton` 컴포넌트와 `View` 로직을 다루는 `RemovebuttonView` 컴포넌트인 두 가지로 나눴다는 것이다.

만약 `View` 로직에 수정이 있게 되면 `UI` 개발자는 단순히 `RemoveButtonView` 만 신경쓰면 된다.

또, 만약 `FE` 로직에 수정이 있게 된다면 `FE` 개발자는 `RemoveButton` 만 신경쓰면 된다.

`VAC` 를 적용 할 때 가장 중요한 점은 다음과 같다.

- 내부에서 `state` 를 가지지 않으며 `state` 를 `props` 를 받아 해당 `state` 를 렌더링 하는 것은 가능하다. 즉 `VAC` 는 `stateless` 컴포넌트이다.
- 이벤트 핸들러를 `props` 로 받은 후 특별한 처리 없이 장착만 하도록 해야 한다.
- 여러 자식 컴포넌트를 갖는 것은 가능하다. 자식 컴포넌트는 `VAC` 든 `VAC` 가 아니든 상관없이 모두 가질 수 있다.

결국 `stateless` 하며 비즈니스 로직이 존재하지 않는 모든 컴포넌트는 `VAC` 가 될 수 있다.

> 꼭 스타일드 컴포넌트를 사용 할 필요 없다. 어떤 방식으로 하든 렌더링 로직만 존재한다면 해당 컴포넌트를 `VAC` 로 볼 수 있다.

# 회고

---

꼭 `VAC` 패턴이 뭔지 단어는 몰랐어도 알게 모르게 자주 쓰고 있었다.

그래도 이름을 알게 돼서 좋긴 했고 , 문제가 발생 할 수 있다는 점을 알게 되었다.

하 ~ 예시가 조금 아쉽다.

나중에 프로젝트 하면서 꼭 `VAC` 패턴을 적용해보고 글을 다시 쓰드록 해야겟다.
