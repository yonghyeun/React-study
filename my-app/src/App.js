import { useState } from 'react';

let nextId = 0;

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  function handleType(e) {
    setText(e.target.value);
  }

  function handleAdd() {
    setTasks([...tasks, { id: nextId++, content: text, isEdit: false }]);
  }

  function handleSave(id, newContent) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id)
          return { id: id, content: newContent, isEdit: false };
        return task;
      }),
    );
  }

  function handleEdit(targetId) {
    setTasks(
      tasks.map((task) => {
        if (task.id === targetId) return { ...task, isEdit: true };
        return task;
      }),
    );
  }

  function handleRemove(targetId) {
    setTasks(tasks.filter((task) => task.id !== targetId));
  }

  return (
    <>
      <h1>To Do List</h1>
      <Input onChange={handleType} />
      <Button onClick={handleAdd}>추가</Button>
      <TodoList
        tasks={tasks}
        onSave={handleSave}
        onEdit={handleEdit}
        onRemove={handleRemove}
      />
    </>
  );
}

function Input({ onChange }) {
  return (
    <input type='text' placeholder='할 일을 입력해주세요' onChange={onChange} />
  );
}

function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

function TodoList({ tasks, onSave, onEdit, onRemove }) {
  if (!tasks) return;

  return (
    <ul>
      {tasks.map((task) => {
        return (
          <li key={task.id} style={{ display: 'flex' }}>
            {task.isEdit ? (
              <TodoInput key={task.id} task={task} onSave={onSave} />
            ) : (
              <TodoText key={task.id} task={task} onEdit={onEdit} />
            )}
            <Button onClick={() => onRemove(task.id)}>Remove</Button>
          </li>
        );
      })}
    </ul>
  );
}

function TodoInput({ task, onSave }) {
  const [localText, setLocalText] = useState(task.content);
  return (
    <>
      <input
        type='text'
        onChange={(e) => setLocalText(e.target.value)}
        value={localText}
      />
      <Button
        onClick={() => {
          onSave(task.id, localText);
        }}
      >
        Save
      </Button>
    </>
  );
}

function TodoText({ task, onEdit }) {
  return (
    <>
      <p>{task.content}</p>
      <Button
        onClick={() => {
          onEdit(task.id);
        }}
      >
        Edit
      </Button>
    </>
  );
}
