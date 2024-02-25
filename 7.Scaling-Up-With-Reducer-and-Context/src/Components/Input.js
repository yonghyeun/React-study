export default function Input({ text, setText }) {
  function handleType(e) {
    setText(e.target.value);
  }
  return (
    <input
      type='text'
      placeholder='할 일을 입력해주세요'
      onChange={handleType}
      value={text}
    />
  );
}
