import { Form } from 'react-router-dom';

export default function Theme() {
  //TODO theme cookie 에서 받아와서 하는걸로 변경하기
  const theme = 'default';
  return (
    <Form method='post'>
      <button id='theme-button' name='theme'>
        {theme === 'default' ? 'dark' : 'default'}
      </button>
    </Form>
  );
}
