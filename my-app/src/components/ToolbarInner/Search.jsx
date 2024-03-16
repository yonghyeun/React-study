import { Form } from 'react-router-dom';

export default function Search() {
  //TODO Search useState 사용하기
  //TODO Search FormGET 요청으로 라우팅하기

  return (
    <Form>
      <input type='search' id='q' name='q' placeholder='Search' />
    </Form>
  );
}
