# `Redux` 튜토리얼 따라하기

---

해당 `docs` 는 리덕스 공식문서인 <a href = 'https://ko.redux.js.org/tutorials/essentials/part-2-app-structure'>Redux App Structure</a> 를 토대로 만들어졌습니다.

# 패키지 의존성

---

```dotnetcli
├── @reduxjs/toolkit@2.2.5
├── @testing-library/jest-dom@5.17.0
├── @testing-library/react@13.4.0
├── @testing-library/user-event@13.5.0
├── @types/jest@27.5.2
├── @types/node@16.18.97
├── @types/react-dom@18.3.0
├── @types/react-redux@7.1.33
├── @types/react@18.3.2
├── react-dom@18.3.1
├── react-redux@9.1.2
├── react-scripts@5.0.1
├── react@18.3.1
├── styled-components@6.1.11
├── typescript@4.9.5
└── web-vitals@2.1.4
```

`create-react-app --template typescript` 로 리액트 앱을 구성한 후 `redux , redux-toolkit` 을 설치해줍니다.

# `Redux` 가 아닌 `Redux-toolkit` 을 이용하는 이유

---

> ### Redux Toolkit
>
> Redux Toolkit is our recommended approach for writing Redux logic.
> It contains packages and functions that we think are essential for building a Redux app.
> Redux Toolkit builds in our suggested best practices, simplifies most Redux tasks, prevents common mistakes, and makes it easier to write Redux applications.
>
> https://ko.redux.js.org/tutorials/essentials/part-1-overview-concepts

`Redux Toolkit` (이하 `RTK`) 는 2019년 10월 `Redux` 팀에 의해서 도입된 라이브러리입니다.

`RTK` 는 `Redux` 공식 문서에서도 공식적으로 권장하는 방식으로 `Redux` 를 이용하기 위해 필요한

다양한 내장도구들이 기본적으로 장착되어 있으며 `Redux` 를 사용 할 때 작성해야 하는 상용구 코드들을 작성하면서 발생 할 수 있는 휴먼에러를 최소화하기 위해 단순화 되어있습니다.

따라서 `Redux` 에서 공식적으로 권장하는 `Redux-toolkit` 을 공부해보도록 하겠습니다.

# `--template redux UI` 구성하기

미리 `Redux` 의 사용 환경이 러프하게 구성되어 있는 `React App` 을 만들고 싶다면

```dotnetcli
npx create-react-app redux-essentials-example --template redux
```

터미널의 다음과 같은 문구를 입력하여 기본적인 `UI` 와 `Redux` 환경이 셋팅 되어 있는 리액트 앱을 생성 할 수 있습니다.

저는 이미 셋팅 되어 있는 튜토리얼을 뜯어보며 공부하기보다

직접 튜토리얼에 있는 로직을 공식문서를 살펴보며 직접 만들어보려 합니다.

![alt text](<redux ui.gif>)

```tsx
import Flex from 'components/Atoms/Flex';
import Count from 'components/Atoms/Count';
import ReduxLogo from 'components/Atoms/Logo';

import { AddButton, SubtractButton } from 'components/Mocules/CounterButton';
import InputCharCounter from 'components/Mocules/InputCharCounter';
import AsyncAddButton from 'components/Mocules/AsyncAddButton';
import SyncAddButton from 'components/Mocules/SyncAddButton';
import OddAddButton from 'components/Mocules/OddAddButton';

const Counter: React.FC = () => {
  return (
    <section>
      <Flex direction='column'>
        <ReduxLogo />
        <Flex>
          <AddButton /> {/* 1 씩 num 을 증가시키는 컴포넌트 */}
          <Count />
          <SubtractButton /> {/* 1 씩 num 을 감소시키는 컴포넌트 */}
        </Flex>
        <Flex>
          <InputCharCounter /> {/* Sync,AsyncAdd 버튼의 증가량 */}
          <SyncAddButton /> {/* 동기적으로 증가시키는 컴포넌트 */}
          <AsyncAddButton /> {/* 비동기적으로 증가시키는 컴포넌트 */}
          <OddAddButton /> {/* 증가량이 홀수라면 증가시키는 컴포넌트 */}
        </Flex>
      </Flex>
    </section>
  );
};

export default Counter;
```

최대한 `--template redux` 로 생성된 `UI` 와 비슷하게 생긴 모습을 구현해둡니다.

현재의 컴포넌트들에는 `state` 가 존재하지 않는 `stateless` 컴포넌트들이며 이제 `redux-toolkit` 을 이용해 전역 상태 환경을 셋팅해보려 합니다.

> `UI` 를 따라 만드는동안 `styled-component` 에 대해서 몰랐던 점을 더 배워갔습니다.
> `props` 에 `$` 사인을 붙이면 `props` 가 `HTMlAttribute` 에 붙는 것을 필터링 해줄 수 있군요

# `Redux Store` 구축하기

---

## `Redux` 의 패턴

<img src = 'https://ko.redux.js.org/assets/images/ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif'>

이전 `docs` 에서 `Redux` 는 `Flux` 패턴과 유사한 데이터 흐름을 갖는다고 하였습니다.

`UI` 에서 발생한 상태 변경을 **액션 객체** 로 생성한 후

`store.dispatch` 를 이용해 **액션 객체** 를 받아 `store` 에 존재하는 **`Reducer`** 들에게 보내 새로운 `state` 를 생성합니다.

이후 새롭게 생성된 `state` 는 `store` 에 저장되고 `store` 에서 변경된 `state` 를 구독하고 있는 `UI` 에게 `re-rendering` 을 야기 합니다.

## `createSlice` 를 이용해 복잡한 `Redux` 환경 셋팅을 한 곳에서 처리하자

`createSlice` 는 `RTK` 에서 `Redux` 의 `reducer logic , action` 과 관련된 로직이 담긴

`CreateSliceOptions` 객체를 인수로 받아 `Reducer , action creator` 등을 한 번에 생성합니다.

사실 문장만을 봐서는 잏해하기가 쉽지 않지만 추후 전체 완성된 환경을 살펴보면 이해가 쉬울 것입니다.

또 , 어려운 단어들이 등장해 (적어도 저는 단어들이 어렵더군요) 무지막지해보이지만 `Redux` 때의 보일러플레이트 코드를 보고 나면 마치 선녀처럼 보일 것입니다.

### `RTK` 가 아닌 `Redux` 일 때 `Reducer` 생성하는 방법

선녀같은 `RTK` 를 만나기 전 `Redux` 를 이용 할 때를 살펴봅시다.

`Redux` 를 이용하여 `Reducer` 들을 생성하기 위해선 다음과 같은 과정을 거쳐야 했습니다.

- 사용 할 `Action` 객체들의 `type` 지정하기

```tsx
// actionTypes.ts
export const INCREMENT = 'counter/increment';
export const DECREMENT = 'counter/decrement';
export const INCREMENT_BY_AMOUNT = 'counter/incrementByAmount';
```

- 액션 객체를 생성할 `Action Creators` 생성하기

```tsx
// actions.ts
import { INCREMENT, DECREMENT, INCREMENT_BY_AMOUNT } from './actionTypes';

export const increment = () => ({
  type: INCREMENT,
});

export const decrement = () => ({
  type: DECREMENT,
});

export const incrementByAmount = (amount) => ({
  type: INCREMENT_BY_AMOUNT,
  payload: amount,
});
```

해당 함수들은 `type:string , payload?: any` 타입의 액션 객체를 생성하는 액션 크리에이터 객체입니다.

해당 메소드로 호출된 액션 객체들은 `store.dispatch` 메소드에 의해 `Reducer` 들에게 건내집니다.

- `Reducer` 에서 사용할 초기 `state` 지정하기

```tsx
// initialState.js
export const initialState = {
  value: 0,
};
```

해당 `initalState` 는 `Reducer` 에서 사용할 초기 상태값을 담은 객체입니다.

- `Reducer` 정의하기

```tsx
// reducer.js
import { INCREMENT, DECREMENT, INCREMENT_BY_AMOUNT } from './actionTypes';
import { initialState } from './initialState';

const counterReducer = (state = initialState, action) =>; {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        value: state.value + 1,
      };
    case DECREMENT:
      return {
        ...state,
        value: state.value - 1,
      };
    case INCREMENT_BY_AMOUNT:
      return {
        ...state,
        value: state.value + action.payload,
      };
    default:
      return state;
  }
};

export default counterReducer;
```

이후 `intalState` 값을 기준으로 `action` 객체의 `type` 값에 따라 `state` 값을 순수 함수를 이용하여 변경하는 `Reducer` 들을 생성해줍니다.

이후 `Reducer` 들을 `store` 에 연결해주면 환경 셋팅은 완료됩니다.

지금의 코드들은 어떤가요 ?

대부분의 로직들이 유사한 코드들의 반복으로 이뤄져있는 것을 볼 수 있습니다.

액션 타입들을 지정해준다던지, 액션 크리에이터를 생성하는 등 말입니다.

또 순수 함수를 이용하는 것이 `state` 값을 변경해주는 행위가 데이터의 무결성을 유지시킬 수 있다는 점은 백번 이해하지만 안타깝게도 순수 함수는 우리에게 익숙하지 않습니다.

우리는 `{...state , value : state.value + 1}` 보단 `state.value += 1` 이 훨씬 익숙하고 편합니다.

### `Redux` 가 아닌 `RTK`의 `createSlice` 를 사용하기

```tsx
import {
  createSlice,
  PayloadAction,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

type CounterState = {
  value: number;
};

const initialState: CounterState = {
  value: 0,
};

const SliceOptions: CreateSliceOptions<CounterState> = {
  name: 'counter',
  initialState,
  reducers: {
    increament: (state) => {
      state.value += 1;
    },
    decreament: (state) => {
      state.value -= 1;
    },
    increamentByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
};

export const counterSlice = createSlice(SliceOptions);

export const { increament, decreament, increamentByAmount } =
  counterSlice.actions;
```

`RTK` 에서 제공하는 `createSlice` 메소드는 `SliceOptions` 객체 하나만으로 충분합니다.

`RTK` 와 `Redux` 의 `Reducer` 생성 방식의 가장 큰 차이점은 다음 두 가지일것입니다.

**1. `Action Type , Action Creator` 함수를 만들지 않아도 됩니다.**
**2. `state` 를 `mutable` 하게 변경 하듯 사용 할 수 있습니다.**

`SliceOptions` 객체의 각 프로퍼티들을 살펴보겠습니다.

- `name` : `createSlice` 로 생성될 리듀서의 이름을 가리킵니다. 해당 값은 생성 될 액션 객체의 타입 값을 `/` 기준 좌측에 할당됩니다. (예 : `type : counter/@@@`)
- `initalState` : `Redux` 때와 동일합니다.
- `reducer` : 생성 할 `Reducer` 의 로직들을 담은 객체이며 내부에는 `(state: , action?) => any` 형태로 선언된 메소드들을 담고 있습니다.
  메소드 명은 생성될 액션 객체의 타입 값 `/` 기준 우측에 할당됩니다. (예 : `type : @@@/increament`)

`RTK` 에서는 `name , reducers` 를 이용해 액션 객체를 생성하는 로직을 단순화 하였습니다.

또 특징적인 것으로 `reducers` 내부의 함수는 `mutable` 하게 `state` 를 변경합니다.

그럼 `RTK` 는 `state` 를 `mutable` 하게 관리하는 걸까요 ?

그렇지 않습니다. 여전히 `immutable` 하게 관리합니다.

`RTK` 는 `immer` 라이브러리를 이용해 설계되었습니다. `immer` 는 `immutable` 하게 `state` 를 변경시키는 로직을 마치 `mutable` 하게 변경 할 수 있게 도와주는 라이브러리입니다.

우리는 그저 변경하고자 하는 `state` 의 로직에만 집중하면 됩니다. `immer` 가 알아서 불변성을 유지시켜 줄 것입니다.
