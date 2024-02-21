import { useState } from 'react';

export default function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('Jane');
  const [lastName, setLastName] = useState('Jacobs');

  function handleEdit(e) {
    e.preventDefault();
    setIsEditing(!isEditing);
  }

  return (
    <form>
      <label>
        first Name :{' '}
        {isEditing ? (
          <input
            placeholder={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        ) : (
          <b>{firstName}</b>
        )}
      </label>
      <label>
        lastName :{' '}
        {isEditing ? (
          <input
            placeholder={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        ) : (
          <b>{lastName}</b>
        )}
      </label>
      <button type='submit' onClick={handleEdit}>
        {isEditing ? 'Save Profile' : 'Edit Profile'}
      </button>
      <p>
        <i>Hello, {firstName + ' ' + lastName}!</i>
      </p>
    </form>
  );
}
