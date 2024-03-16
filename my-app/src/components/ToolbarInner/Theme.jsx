import { Form } from 'react-router-dom';

export default function Theme() {
  //TODO Theme 은 useFetcher 사용해서 redirecting 없게 하기
  //TODO theme cookie 에서 받아와서 하는걸로 변경하기
  const theme = 'default';
  const isDark = theme === 'dark';
  return (
    <Form method='post'>
      <button
        id='theme-button'
        name='theme'
        value={isDark ? 'default' : 'dark'}
      >
        {isDark ? 'default' : 'dark'}
      </button>
    </Form>
  );
}
