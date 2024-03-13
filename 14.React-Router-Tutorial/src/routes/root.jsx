import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit,
} from 'react-router-dom';
import { getContacts, createContact } from '../contact';
import { useRef, useEffect } from 'react';
export function Root() {
  const { contacts, param } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();
  const inputRef = useRef();

  /*
  navigation 객체의 location 은 state 가  loading 일 때 
  요청을 보낸 API 의 endpoint 를 가리킨다. 
  isSearching 은 location 의 state 가 loading 이면서 , api 요청이 
  /?q=.. 를 이용한 것인지 를 묻는 것이다. 
   */
  const isSearching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('q');

  useEffect(() => {
    inputRef.current.value = param;
  }, [param]);

  return (
    <>
      <div id='sidebar'>
        <h1>React Router Contacts</h1>
        <div>
          <Form id='search-form' role='search'>
            <input
              id='q'
              aria-label='Search contacts'
              placeholder='Search'
              type='search'
              name='q'
              defaultValue={param}
              ref={inputRef}
              onChange={(event) => {
                const isFirstSearching = param == null;
                submit(event.target.form, { replace: !isFirstSearching });
              }}
              className={navigation.state === 'loading' ? 'loading' : ''}
            />
            <div id='search-spinner' aria-hidden hidden={!isSearching}></div>
            <div className='sr-only' aria-live='polite'></div>
          </Form>
          <Form method='post'>
            <button type='submit'>New</button>
          </Form>
        </div>
        <nav>
          <ul>
            {contacts.length ? (
              contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No name</i>
                    )}{' '}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))
            ) : (
              <p>
                <i>No contacts</i>
              </p>
            )}
          </ul>
        </nav>
      </div>
      <div
        id='detail'
        className={navigation.state === 'loading' ? 'loading' : ''}
      >
        <Outlet />
      </div>
    </>
  );
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const param = url.searchParams.get('q');
  const contacts = await getContacts(param);

  return { contacts, param };
}

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}
