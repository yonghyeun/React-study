// ./Components/Selector.js

export default function Selector({ userId, onChange }) {
  const idArr = Array.from({ length: 10 }, (_, idx) => idx + 1);

  return (
    <label>
      유저 ID 를 선택하세요
      <select name='selector' id='selector' onChange={onChange} value={userId}>
        {idArr.map((id) => (
          <option value={id} key={id}>
            {id}
          </option>
        ))}
      </select>
    </label>
  );
}
