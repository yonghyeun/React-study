import { useConnection } from '../Core/connectionContext';

export default function SelectTheme() {
  const network = useConnection();

  function handleSelect(e) {
    const selectedTheme = e.target.value;
    network.updateTheme(selectedTheme);
  }

  return (
    <main>
      <label htmlFor='theme'>
        적용 할 테마를 골라주세요{' '}
        <select name='theme' id='theme' onChange={handleSelect}>
          <option value='default'>Default Mode</option>
          <option value='DarkMode'>Dark Mode</option>
        </select>
      </label>
    </main>
  );
}
