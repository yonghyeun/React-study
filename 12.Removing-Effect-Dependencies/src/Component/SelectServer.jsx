import { useConnection } from '../Core/connectionContext';

export default function SelectServer() {
  const network = useConnection();

  function handleSelect(e) {
    const selectedId = e.target.value;
    network.disconnect();
    network.updateRoomId(selectedId);
  }

  return (
    <main>
      <label htmlFor='category'>
        연결 할 서버를 골라주세요{' '}
        <select name='category' id='category' onChange={handleSelect}>
          <option value='general'>General</option>
          <option value='music'>Music</option>
          <option value='game'>Game</option>
        </select>
      </label>
    </main>
  );
}
