import { Form, useLoaderData } from 'react-router-dom';
import { getContact } from '../contact';

export function Contact() {
  const { contact } = useLoaderData();

  return (
    <div id='contact'>
      <div>
        <img
          src={contact.avatar || null}
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

export async function loader({ params }) {
  const contactId = params.contactId;
  const contact = await getContact(contactId);
  return { contact };
}
