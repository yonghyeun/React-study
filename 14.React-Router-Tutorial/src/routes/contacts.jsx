import { Form, useFetcher, useLoaderData } from 'react-router-dom';
import { getContact, updateContact } from '../contact';

export function Contact() {
  const { contact } = useLoaderData();
  return (
    <div id='contact'>
      <div>
        <img
          src={
            contact.avatar ||
            'https://as2.ftcdn.net/v2/jpg/02/29/75/83/1000_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg'
          }
          alt={contact.first + contact.last || null}
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

        {contact.notes && <p>{contact.notes}</p>}

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
  const fetcher = useFetcher();
  let favorite = contact.favorite;

  if (fetcher.formData) {
    // fecther.formData 가 존재 할 경우 (요청중일 때)
    // 렌더링 할 때 바뀔 데이터로 미리 렌더링 하도록 설정
    favorite = fetcher.formData.get('favorite') === 'true';
  }

  return (
    <fetcher.Form method='post' replace={false}>
      <button
        name='favorite'
        value={favorite ? 'false' : 'true'}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {favorite ? '★' : '☆'}
      </button>
    </fetcher.Form>
  );
}

export async function loader({ params }) {
  const contactId = params.contactId;
  const contact = await getContact(contactId);
  if (!contact) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }

  return { contact };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const nextFavorite = formData.get('favorite') === 'true';
  const contactId = params.contactId;
  return await updateContact(contactId, { favorite: nextFavorite });
}
