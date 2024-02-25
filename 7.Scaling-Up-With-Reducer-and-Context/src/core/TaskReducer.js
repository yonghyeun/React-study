/**
 * @param {Array} tasks 컴포넌트의 State
 * @param {Object} action 이벤트 핸들러에서 디스패치한 이벤트 객체
 * 액션 타입과 이벤트 핸들시 필요한 파라미터를 프로퍼티로 가지고 있음
 * @returns {Array} 새로 갱신 할 State
 */

let nextId = 0;

export default function taskReducer(tasks, action) {
  console.log(action);

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
