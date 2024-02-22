import { useReducer, useState } from 'react';
import './App.css';

let nextId = 0;

export default function App() {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [text, setText] = useState('');

  function handleType(e) {
    setText(e.target.value);
  }

  function dispatchAdd() {
    dispatch({
      type: 'add',
      text,
    });
  }

  function dispatchSave(targetId, newContent) {
    dispatch({
      type: 'save',
      targetId,
      newContent,
    });
  }

  function dispatchEdit(targetId) {
    dispatch({
      type: 'edit',
      targetId,
    });
  }

  function dispatchRemove(targetId) {
    dispatch({
      type: 'remove',
      targetId,
    });
  }

  return (
    <>
      <h1>To Do List</h1>
      <div className='header'>
        <Input onChange={handleType} />
        <Button onClick={dispatchAdd}>Add</Button>
      </div>
      <TodoList
        tasks={tasks}
        onSave={dispatchSave}
        onEdit={dispatchEdit}
        onRemove={dispatchRemove}
      />
    </>
  );
}

/**
 * @param {Array} tasks 컴포넌트의 State
 * @param {Object} action 이벤트 핸들러에서 디스패치한 이벤트 객체
 * 액션 타입과 이벤트 핸들시 필요한 파라미터를 프로퍼티로 가지고 있음
 * @returns {Array} 새로 갱신 할 State
 */
function taskReducer(tasks, action) {
  switch (action.type) {
    // add 일 때 필요한 action 프로퍼티는 text
    case 'add': {
      return [...tasks, { id: nextId++, content: action.text, isEdit: false }];
    }

    case 'save': {
      // save 일 때 필요한 action 프로퍼티는 targetId , newContent
      return tasks.map((task) => {
        if (task.id === action.targetId)
          return {
            id: action.targetId,
            content: action.newContent,
            isEdit: false,
          };
        return task;
      });
    }

    case 'edit': {
      // edit 일 떄 필요한 action 프로퍼티는 targetId
      return tasks.map((task) => {
        if (task.id === action.targetId) return { ...task, isEdit: true };
        return task;
      });
    }

    case 'remove': {
      // remove 일 떄 필요한 action 프로퍼티는 targetId
      return tasks.filter((task) => task.id !== action.targetId);
    }

    default: {
      throw new Error('처음 보는 Type 인디요');
    }
  }
}

// Components
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
    <>
      {tasks.map((task) => {
        return (
          <div key={task.id} className='container'>
            {task.isEdit ? (
              <TodoInput key={task.id} task={task} onSave={onSave} />
            ) : (
              <TodoText key={task.id} task={task} onEdit={onEdit} />
            )}
            <Button onClick={() => onRemove(task.id)}>Remove</Button>
          </div>
        );
      })}
    </>
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
