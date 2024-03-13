import { Form, useLoaderData, redirect, useNavigate } from 'react-router-dom';
import { updateContact } from '../contact';

export function EditContact() {
  const contact = useLoaderData();
  const navigate = useNavigate();
  return (
    <Form method='post' id='contact-form'>
      <p>
        <span>Name</span>
        <input
          type='text'
          name='first'
          defaultValue={contact.first}
          aria-label='first name'
          placeholder='fist'
        />
        <input
          type='text'
          name='last'
          defaultValue={contact.last}
          aria-label='last name'
          placeholder='last'
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type='text'
          name='twitter'
          placeholder='@jack'
          defaultValue={contact.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          type='text'
          name='avatar'
          aria-label='Avatar URL'
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name='notes' rows={6} defaultValue={contact.notes} />
      </label>
      <p>
        <button type='submit'>Save</button>
        <button
          type='button'
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancle
        </button>
      </p>
    </Form>
  );
}

export async function action({ request, params }) {
  const { contactId } = params;

  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(contactId, updates);

  return redirect(`/contacts/${contactId}`);
}
