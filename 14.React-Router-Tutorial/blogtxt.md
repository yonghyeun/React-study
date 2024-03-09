본 게시글의 내용은 모두 공식문서인 <a href = 'https://reactrouter.com/en/main/router-components/browser-router'>React Router</a> 를 토대로 하고 있습니다.

---

# `Overview`

### `Client Side Rendering`

![](https://velog.velcdn.com/images/yonghyeun/post/fbaab175-4637-4ffe-be7b-06c29311a2a9/image.webp)

전통적인 브라우저는 클라이언트의 요청에 따라 이미 만들어둔 도큐먼트를 웹 서버에 요청 , 받는

서버 사이드 렌더링이 일어났다.

> 서버단에서 렌더링 해둔 도큐먼트를 클라이언트에게 전달해주는 렌더링 기법

하지만 이는 매 요청마다 새로운 도큐먼트를 받아 파싱해야 하기 때문에 성능 저하 뿐이 아니라 사용자 입장에서도

화면이 깜박거리는 등 낮은 `UX` 를 선사했다.

_네이버 지도에서 좌표를 조금만 이동해도 새로운 페이지를 받는다 생각해보자 생각만해도 열받는다_

하지만 서버 단에서 렌더링 된 도큐먼트를 받는 것이 아니라

서버에게는 **새롭게 렌더링에 필요한 자료**를 요청하고 , 요청 받은 자료를 가지고

**클라이언트 단에서 동적으로 렌더링 ** 하는 클라이언트 사이드 렌더링 기법이 생겨났다.

### `Client Side Routing`

클라이언트 사이드 렌더링 기법은 **하나의 페이지에서 인터렉션에 따라 렌더링 하는 화면을 다르게 하는 것일뿐**

**렌더링 되는 화면과 페이지의 주소가 일치하지 않는다는 문제가 있었다.**

이런 문제를 해결 할 수 있도록 브라우저 객체인 `Window` 의 `history` 객체를 이용하여

**렌더링 되는 화면이 변경됨에 따라 브라우저의 주소도 같이 변경해주도록 하였다.**

![](https://velog.velcdn.com/images/yonghyeun/post/cf4544f9-28e3-4ac9-9ebc-80780a565d62/image.gif)

> 이 부분과 관련되 내용은 <a href = 'https://velog.io/@yonghyeun/React-Router-%EB%9D%BC%EC%9A%B0%ED%84%B0-%ED%86%BA%EC%95%84%EB%B3%B4%EA%B8%B0-%EB%A6%AC%EC%95%A1%ED%8A%B8%EA%B0%80-%EC%95%84%EB%8B%8C-VanilaJS-%EC%97%90%EC%84%9C%EC%9D%98-SPA-%EB%9D%BC%EC%9A%B0%ED%84%B0'>React Router - 라우터 톺아보기 (리액트가 아닌 VanilaJS 에서의 SPA 라우터)</a> 을 보면 좋을 것같다.

꼭 모든 인터렉티브하게 렌더링 되는 화면과 주소가 일치 될 필요는 없지만

특정 링크나 , 클라이언트를 네비게이트 시키는 경우에는 렌더링 되는 화면과 주소가 일치되는 편이

클라이언트가 링크를 공유하거나 , 북마크 할 때 간편할 것이다.

> _예를 들어 리액트 공식문서에서 useState 를 검색하면 내 URL 이 여전히 `https://react.dev/` 인 것 보다 `https://react.dev/reference/react/useState` 인 편이 북마크하거나 공유하기에 훨씬 좋다._

이와 같이 **전체 화면을 리로드 하지 않고 (MPA 때 처럼) 다른 페이지로 가도록 하는 일련의 과정을 `Routing` 이라고 한다.**

---

# `SPA Routing` 의 기본 전제조건 : `Routing Layer`

`react router dom` 뿐만 아니라 `SPA` 에서 라우팅 할 때 사용하는 기존 로직이 존재한다.

이는 `Routing layer` 를 구현해두는 것이다.

클라이언트가 다른 페이지로 네비게이팅 되고자 할 때 라우팅 레이어를 통해

**어떤 페이지로 가기를 원하고 , 어떤 화면이 렌더링 되어야 하는지** 를 확인한다.

`react-router-dom` 의 라우팅 레이어는 기본적으로 두 가지 모습을 따른다.

### `PathConstants`

```jsx
const PathConstants = {
  TEAM: '/team',
  REPORT_ANALYSIS: 'reports/:reportId/analysis',
  // ...
};
```

모든 페이지의 라우팅 될 주소를 저장하고 있는 객체이다.

### `routes`

```jsx
const routes = [
  { path: PathConstants.TEAM, element: <TeamPage /> },
  { path: PathConstants.REPORT_ANALYSIS, element: <ReportAnalysisPage /> },
  // ...
];
```

라우팅 되었을 때 렌더링 될 컴포넌트들의 정보를 담고 있는 객체들을 담고 있는 배열이다.

### 사용 예시

위처럼 라우팅 될 주소를 담고 있는 `PathConstants` 객체와 라우팅 시 렌더링 될 컴포넌트의 정보를 담고 있는 `routes` 객체를 이용하면

```jsx
<a href={PathConstants.TEAM}>Go to the team page!</a>
```

다음과 같이 팀 페이지로 라우팅 시키는 태그를 클라이언트가 클릭하여 라우팅 되었을 때

`PathConstants` 에 의해 주소창은 `/team` 으로 변경 될 것이고

`routes` 를 통해 페이지에 렌더링 되는 화면은 `<TeamPage />` 로 변경될 것이다.

> 중간에 라우팅 될 페이지와 렌더링 시키는 로직이 존재하는 컴포넌트들을 사용해야 하기는 한다.
> 그것은 ~~ `react router dom` 에서 제공하는 ~~ 컴포넌트들 ~~

---

# `React Router DOM Tutorial`

해당 페이지에서 제공하는 튜토리얼 페이지를 따라가며 이해해보자

<a href = 'https://reactrouter.com/en/main/start/tutorial'>튜토리얼 링크</a>

우선 리액트 폴더를 만든 후 페이지에서 요구하는 프로젝트 구조에 맞춰 구현해주도록 하자

```
│  ├─ public
│  │  ├─ index.html
│  ├─ README.md
│  └─ src
│     ├─ contacts.js
│     ├─ index.css
│     ├─ index.js (entry file)
```

![](https://velog.velcdn.com/images/yonghyeun/post/21a50217-3502-4d6a-8431-b48ad15478b0/image.png)

튜토리얼을 따라가다보면 생기는 완성본은 다음과 같은 쌈뽕한 파일인데 이를 위한 `css` 파일을 튜토리얼 링크에서 제공한다.

<a href = 'https://gist.githubusercontent.com/ryanflorence/ba20d473ef59e1965543fa013ae4163f/raw/499707f25a5690d490c7b3d54c65c65eb895930c/react-router-6.4-tutorial-css.css
'>쌈뽕한 index.css , index.css 에 옮겨담아주자</a>

### `index.js` (`entry file`)

엔트리 파일을 다음과 같이 구성해준다.

```jsx
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Root from './routes/root';

/* root route 설정 */
const router = createBrowserRouter([{ path: '/', element: <Root /> }]);

/* root node 하위에 렌더링 될 모든 컴포넌트에게 
RouterProvider 를 통해 context 로 router를 건내줌 
*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
```

기존 리액트 파일에서 추가된 점은 `router` 를 `createBrowserRouter` 를 이용해 생성해주고

`root node` 에서 `Routerprovider` 를 통해 `router` 를 전역적으로 제공한다.

이 때 `createBrowserRouter` 로 생성되는 배열은 라우팅 시킬 주소를 담은 `path` 프로퍼티와

렌더링 할 `element` 객체를 담아주도록 한다.

### `Root.jsx`

그러면 `/` 일 때 (기본 페이지) 라우팅 되기로 약속한 `Root` 엘리먼트를 만들어주자

```jsx
export default function Root() {
  return (
    <>
      <div id='sidebar'>
        <h1>React Router Contacts</h1>
        <div>
          <form id='search-form' role='search'>
            <input
              id='q'
              aria-label='Search contacts'
              placeholder='Search'
              type='search'
              name='q'
            />
            <div id='search-spinner' aria-hidden hidden={true} />
            <div className='sr-only' aria-live='polite'></div>
          </form>
          <form method='post'>
            <button type='submit'>New</button>
          </form>
        </div>
        <nav>
          <ul>
            <li>
              <a href={`/contacts/1`}>Your Name</a> // '/contacts/1' 로 라우팅
              시키는 태그
            </li>
            <li>
              <a href={`/contacts/2`}>Your Friend</a> // '/contacts/2' 로 라우팅
              시키는 태그
            </li>
          </ul>
        </nav>
      </div>
      <div id='detail'></div>
    </>
  );
}
```

`Root` 컴포넌트는 `/contacts/:id` 로 라우팅 시키는 두 개의 태그가 존재한다.

이렇게 하고 `npm start` 를 통해 페이지를 살펴보자

### `Handling Not Found Errors`

![](https://velog.velcdn.com/images/yonghyeun/post/35f4d2b2-6c66-43d9-9b62-54c43efdcdb2/image.png)

이렇게 작성하고 나면 에러가 발생한다.

그 이유는 `Root` 엘리먼트에서 라우팅 시킬 주소인 `/contacts/:id` 들에 대한 페이지가 존재하지 않기 때문이다.

이렇게 존재하지 않는 페이지로 접근하고자 할 때 렌더링 할 컴포넌트를 생성해주자

```jsx
/* src/ error-page.jsx 
존재하지 않는 페이지로 접근 할 경우 렌더링 할 에러 페이지
*/

import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id='error-page'>
      <h1>Oops!</h1>
      <p>미안 ~ 예기치 못한 에러가 발생했어 ~!!</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
```

이후 생성한 에러 컴포넌트를 `entry file` 인 `index.js` 에서

전역 `router` 내부에서 생성해주자

```jsx
/* src/index.js */
...
import ErrorPage from './error-page';

/* root route 설정 */
const router = createBrowserRouter([
  { path: '/', element: <Root />, errorElement: <ErrorPage /> }, // errorElement 에 추가
]);
```

![](https://velog.velcdn.com/images/yonghyeun/post/0e93a911-4ae4-480c-9661-f842bb77a003/image.gif)

이후의 리액트 라우터는 에러 핸들링을 가능하게 할 `errorElement` 프로퍼티가 존재하니

문제 없이 초기 렌더링이 된다.

그리고 `contact/:id` 로 라우팅 시키는 `YourName` 을 클릭하니 해당 렌더링 할 컴포넌트를 찾지 못해

위에서 제공한 `ErrorPage` 컴포넌트를 렌더링 하는 모습을 볼 수 있다.

> ### `useRouteError`
>
> `useRouteError` 는 `react-router-dom` 에서 제공하는 훅으로
> ![](https://velog.velcdn.com/images/yonghyeun/post/5856b306-06eb-440b-a22c-30ff2daf06e1/image.png)
> 에러가 발생 시 에러와 관련된 객체인 `ErrorResponselmpl` 객체를 반환한다.
> 해당 객체에는 애러 상태 코드와 상태 텍스트 등의 정보들을 담고 있다.

### `The Contact Route UI`

에러를 핸들링 할 페이지는 만들었으니 그럼 라우팅 될 페이지를 생성해보자

우리는 `YourName` 이나 `Your Friend` 를 클릭하면 라우팅 할 컴포넌트를 생성해보도록 하자

```jsx
/*src/contact
튜토리얼에서 제공하는 쌈뽕한 컴포넌트 
*/

import { Form } from 'react-router-dom';

export default function Contact() {
  const contact = {
    first: 'Your',
    last: 'Name',
    avatar: 'https://placekitten.com/g/200/200',
    twitter: 'your_handle',
    notes: 'Some notes',
    favorite: true,
  };

  return (
    <div id='contact'>
      <div>
        <img
          src={contact.avatar || null}
          alt={contact.first + contact.last}
          key={contact.avatar}
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>{contact.first + contact.last}</>
          ) : (
            <i>No Name</i>
          )}{' '}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a target='_blank' href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}

        <div>
          <Form action='edit'>
            <button type='submit'>Edit</button>
          </Form>
          <Form
            method='post'
            action='destory'
            onSubmit={(event) => {
              if (!window.confirm('너 진짜로 삭제할거야 ?')) {
                // window.confirm 은 확인과 취소 두 버튼을 가지며 메시지를 지정 할 수 있는
                // 모달 대화 상자를 띄운다.
                event.preventDefault();
              }
            }}
          >
            <button type='submit'>Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }) {
  let favorite = contact.favorite;
  return (
    <Form method='post'>
      <button
        name='favorite'
        value={favorite ? 'false' : 'true'}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {favorite ? '★' : '☆'}
      </button>
    </Form>
  );
}
```

### `Nested Router`

![](https://velog.velcdn.com/images/yonghyeun/post/d123fbb9-0296-47f3-9ccd-29e90f585051/image.gif)

현재의 라우팅은 `/` 일 때는 `Root` 컴포넌트가 렌더링 되고

`/contact/:contactId` 일 때는 `Contact` 컴포넌트가 렌더링 된다.
![](https://velog.velcdn.com/images/yonghyeun/post/40470eb8-7946-42b8-ac67-c03180a0cb47/image.png)

다음과 같은 결과물을 얻기 위해서는 어떻게 해야 할까

문제를 먼저 파악해보자

```jsx
/* root route  */
const router = createBrowserRouter([
  { path: '/', element: <Root />, errorElement: <ErrorPage /> },
  { path: 'contacts/:contactId', element: <Contact /> }, // contacts/:contactId 로 라우팅 될 경우
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // root 의 innerHTML 은 모두 <Contact > 컴포넌트가 된다.
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
```

우리가 원하는 것은 여전히 `<Root>` 컴포넌트가 렌더링 되며

동시에 `<Contact>` 컴포넌트가 함께 렌더링 되는 것을 기대한다.

하지만 현재 `<Root>` 컴포넌트와 `<Contact>` 컴포넌트의 라우터 경로는

`/` 와 `/contacts/:contactId` 라는 두 개의 독립적인 관계로 구성되어 있다.

### `Render an <Outlet>`

`<Contact>` 컴포넌트가 `<Root>` 컴포넌트의 하위 컴포넌트로 렌더링 되기를 기대하기 때문에

두 컴포넌트의 라우터 레이어를 **계층적 구조**로 구성해주자

```jsx
/* root route 설정 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      // Contact 컴포넌트를 Root 컴포넌트의 하위 컴포넌트로 생성
      { path: 'contacts/:contactId', element: <Contact /> },
    ],
  },
]);
```

`PathConstants` 인 `router` 자료구조에서 `<Root>` 컴포넌트의 `children` 으로 `<Contact>` 컴포넌트를 넣어준다.

이를 통해 `contacts/:contactId` 로 라우팅 되기 위해서는 부모 라우터 주소인 `/` 가 먼저 렌더링 되기어

`<Root>` 컴포넌트가 렌더링 된 후

`/contacts/:contactId` 가 라우팅 된다.

![](https://velog.velcdn.com/images/yonghyeun/post/d9f0ebf3-90e6-44df-9e08-e6eac377bf62/image.gif)

각 `URL` 주소의 계층적 구조를 구성해주었기 때문에 `/` 로 라우팅 된 브라우저에서

하위 계층으로 라우팅 되더라도 여전히 부모 컴포넌트는 렌더링이 마저 되고 있는 모습을 볼 수 있다.

하지만 아직 자식 컴포넌트는 렌더링 되고 있지 않다.

이는 부모 컴포넌트에서 하위 컴포넌트를 렌더링 할 위치를 지정해주지 않았기 때문이다.

```jsx
import { Outlet } from 'react-router-dom'; // Outlet 컴포넌트 import

export default function Root() {
  return (
    <>
      /* .. 기존 작성된 다른 태그들 .. */
      <div id='detail'>
        <Outlet />
      </div>
    </>
  );
}
```

`<Outlet>` 컴포넌트는 `routes` 자료구조에 저장된 `children` 에 담긴 라우터 객체들 중 **현재 라우팅 된 `URL`의 주소와 매칭되는 컴포넌트를 찾아 렌더링 한다.**

> 마치 `props` 로 전달 받은 `children` 컴포넌트를 내부에서 정의하는 것과 비슷하다.
> 하지만 따로 `props` 로 전달해주지 않으니 `Context` 를 이용하는 것 같다.
>
> > 지피티를 좀 더 닥달하니 리액트 라우터 돔의 내부 훅인 `useParams , useLocation , useNavigate` 등의 훅을 이용한다고 하는데 해당 훅은 리액트의 `useContext` 를 활용했다고 한다.

![](https://velog.velcdn.com/images/yonghyeun/post/f97ae25b-c780-4a74-9053-735b908929cc/image.gif)

![](https://velog.velcdn.com/images/yonghyeun/post/a9e35c71-d36a-441a-8106-1fb14159ff62/image.gif)

---

# `Client Side Routing`

### `That was not Client side routing !`

다만 지금까지 한 것들이 `Client Side Routing` 이 아니라면 .. 믿으시겠습니까

![](https://velog.velcdn.com/images/yonghyeun/post/4592d9a1-9fa1-4a8d-8463-d14d542a0ffb/image.gif)

다른 페이지로 라우팅 될 때 마다 네트워크 요청이 지속적으로 가는 모습을 볼 수 있다.

그 이유는 `Root` 컴포넌트에서 다른 페이지를 라우팅 하는 태그가 `a` 태그로 되어 있기 때문이다.

```jsx
export default function Root() {
  return (
    /* .. 다른 컴포넌트 내용들 */
    <ul>
      <li>
        <a href={`/contacts/1`}>Your Name</a>
      </li>
      <li>
        <a href={`/contacts/2`}>Your Friend</a>
      </li>
    </ul>
    /* .. 다른 컴포넌트 내용들 */
  );
}
```

`a` 태그의 기본적 이벤트는 `href` 에 적힌 주소로 서버에 `GET` 요청을 보내는 것이다.

이에 해당 태그를 누르면 클라이언트는 서버에 `basename/contacts/1` 요청을 보내게 된다.

하지만 싱글 페이지를 제공하는 서버에서는 어떤 주소의 요청에 대해서도 기본 `path` 를 갖는 엔트리 파일만을 제공하기 때문에

`index.js` 가 제공 된다.

> `URL` 주소는 태그를 눌러 요청한 `/contacts/1` 이다.

이후 코드를 파싱하는 과정에서 현재의 `URL` 이 `./contacts/1` 이기 때문에 리액트 라우터 돔은

해당 `path` 에 맞는 컴포넌트를 렌더링 하는 것이다.

지금의 과정들은 일반적인 `MPA` 에서 라우팅 하는 방식과 차이가 없다.

![](https://velog.velcdn.com/images/yonghyeun/post/d53aa884-5a5b-4385-b875-47a9ec81c06b/image.gif)

### `Change the <a href> to <Link to>`

```jsx
import { Outlet, Link } from 'react-router-dom'; // Link 컴포넌트 import

export default function Root() {
  return (
    <>
	/* { 다른 작성된 태그들 .. }*/
        <nav>
          <ul>
            <li>
              <Link to={`/contacts/1`}>Your Name</Link> // a href -> Link to
            </li>
            <li>
              <Link to={`/contacts/2`}>Your Friend</Link>
            </li>
          </ul>
        </nav>
      /* { 다른 작성된 태그들 .. }*/
    </>
  );
}
```

`<Link>` 컴포넌트와 그의 `props` 인 `to` 는 다음과 같은 의미를 갖는다.

1. `<Link>` 컴포넌트는 해당 태그를 클릭하면 `to` 로 지정된 페이지로 라우팅 하도록 한다.
2. 해당 페이지를 라우팅 할 때 **새로운 페이지를 요청하는 것이 아니라 브라우저의 히스토리 스택에 해당 `to` 에 적힌 `path` 를 추가한다.**
3. 2번 과정을 통해 브라우저의 뒤로 가기 및 앞으로 가기 버튼을 통한 탐색이 가능하다 .
4. 리액트 라우터 돔은 변경된 `path` 에 맞춰 적절한 컴포넌트를 렌더링한다.

`<a href=..>` 와 다르게 `<Link to=..>` 는 **페이지 요청 없이 `URL` 주소만 변경하기 때문에 훨씬 빠르며 `SPA`스럽다.**

---

### 투 비 컨티뉴 .. 아직 다 안적었으요

---

출처 : <a href = 'https://semaphoreci.com/blog/routing-layer-react'>How to Build a Routing Layer in React and Why You Need It</a>
