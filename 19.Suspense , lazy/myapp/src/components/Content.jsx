import { styled } from 'styled-components';
const ContentView = styled.section`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const delay = (ms) => {
  return new Promise((res) =>
    setTimeout(() => {
      res(null);
    }, ms),
  );
};

const suspenderMakerFn = () => {
  let result;
  let state = 'pending';
  const fetching = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts?userId=1',
      );
      await delay(2000); // delay 를 위한 코드
      const json = await response.json();
      state = 'fulfilled';
      result = json;
    } catch (e) {
      state = 'error';
      result = e;
    }
  };

  return {
    read() {
      switch (state) {
        case 'pending':
          throw fetching();
        case 'error':
          throw result;
        default:
          return result;
      }
    },
  };
};

const suspenderMaker = suspenderMakerFn();

const Content = () => {
  const posts = suspenderMaker.read();

  return (
    <ContentView>
      <ul>
        {posts.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    </ContentView>
  );
};

export default Content;
