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
