import { useState } from 'react';
import './App.css';

let id = 0;

export default function App() {
  const [content, setContent] = useState('');
  const [todo, setTodo] = useState([]);
  const [isFilter, setIsFilter] = useState(3);

  function typeContent(event) {
    setContent(event.target.value);

    if (event.key === 'Enter') {
      AddTodo();
      event.target.value = '';
    }
  }

  function AddTodo() {
    setTodo([...todo, { id: id++, content: content, done: false }]);
    setContent('');
  }

  return (
    <div style={{ position: 'absolute', top: '10vh', left: '20vw' }}>
      <div>
        <Input onKeyUp={typeContent} />
        <AddButton onClick={AddTodo} />
      </div>
      <FilterdItems todo={todo} setTodo={setTodo} isFilter={isFilter} />
      <ChangeActiveButtons setIsFilter={setIsFilter} />
    </div>
  );
}
function Input({ onKeyUp }) {
  return (
    <input type='text' placeholder='할 일을 입력해주세요' onKeyUp={onKeyUp} />
  );
}

function AddButton({ onClick }) {
  return <button onClick={onClick}>추가</button>;
}

function ChangeActiveButtons({ setIsFilter }) {
  return (
    <div>
      <button
        onClick={() => {
          setIsFilter(3);
        }}
      >
        전체보기
      </button>
      <button
        onClick={() => {
          setIsFilter(0);
        }}
      >
        완료보기
      </button>
      <button
        onClick={() => {
          setIsFilter(1);
        }}
      >
        미완료보기
      </button>
    </div>
  );
}

function FilterdItems({ todo, setTodo, isFilter }) {
  let items;

  if (isFilter === 3) {
    items = [...todo];
  } else {
    items = todo.filter(({ done }) => +done === isFilter);
  }

  function changeDone(targetId, setTodo) {
    const copyTodo = [...todo];
    const targetIndex = copyTodo.findIndex((item) => item.id === targetId);
    const { id, content, done } = copyTodo[targetIndex];

    setTodo([
      ...copyTodo.slice(0, targetIndex),
      { id, content, done: !done },
      ...copyTodo.slice(targetIndex + 1),
    ]);
  }

  function deleteItem(targetId, setTodo) {
    const copyTodo = [...todo];
    const targetIndex = copyTodo.findIndex((item) => item.id === targetId);

    setTodo([
      ...copyTodo.slice(0, targetIndex),
      ...copyTodo.slice(targetIndex + 1),
    ]);
  }

  return (
    <ul>
      {items.map(({ id, content, done }) => {
        return (
          <div key={id + 'div'} style={{ display: 'flex' }}>
            <li key={id}>{content}</li>
            <button
              key={id + 'change button'}
              onClick={() => {
                changeDone(id, setTodo);
              }}
              style={{ color: done ? 'blue' : 'red' }}
            >
              {done ? '미완료' : '완료'}
            </button>
            <button
              key={id + 'delete button'}
              onClick={() => {
                deleteItem(id, setTodo);
              }}
            >
              삭제
            </button>
          </div>
        );
      })}
    </ul>
  );
}
