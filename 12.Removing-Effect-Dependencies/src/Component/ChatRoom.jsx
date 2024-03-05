import { useState } from 'react';

export default function ChatRoom() {
  const [text, setText] = useState('');

  return (
    <input
      type='text'
      onChange={(e) => {
        setText(e.target.value);
      }}
    />
  );
}
