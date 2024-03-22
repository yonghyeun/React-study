// Storage는 객체 형태를 저장하는 것이 가능하지만
// 저장시에는 JSON.strantify 로 직렬화
// 조회시에는 JSON.parse 로 객체 형태로 가져와야 한다.

export const setStorageItem = (storageName, key, value) => {
  switch (storageName) {
    case 'localStorage':
      window.localStorage.setItem(key, JSON.stringify(value));
      break;
    case 'sessionStorage':
      window.sessionStorage.setItem(key, JSON.stringify(value));
      break;
    default:
      throw Error('localStorage 혹은 sessionStorage 에서 선택해주세요');
  }
};

export const removeStorageItem = (storageName, key) => {
  switch (storageName) {
    case 'localStorage':
      window.localStorage.removeItem(key);
      break;
    case 'sessionStorage':
      window.sessionStorage.removeItem(key);
      break;
    default:
      throw Error('localStorage 혹은 sessionStorage 에서 선택해주세요');
  }
};

/**
 * {...window.localStorage} 처럼 하는 이유는 Storage Object.values(window.localStorage) 로 불러왔을 때엔
 * 특별한 순서 없이 가져오기 때문에 순서가 보장되지 않는다. (Storage 들은 값을 저장 할 때 순서를 보장하지 않는다.)
 * 그렇기에 디스트럭처링을 이용해 key 값을 이용해 순서를 보장시킨 후 가져오도록 한다.
 * @param {{storageName : String}}
 * @returns
 */
export const getStorageItems = (storageName) => {
  switch (storageName) {
    case 'localStorage':
      const localStorageItems = Object.values({ ...window.localStorage }).map(
        (todoString) => JSON.parse(todoString),
      );
      return localStorageItems.toSorted(
        (todo, nextTodo) => todo.id - nextTodo.id,
      );

    case 'sessionStorage':
      const sessionStorageItems = Object.values({
        ...window.sessionStorage,
      }).map((todoString) => JSON.parse(todoString));

      return sessionStorageItems.toSorted(
        (todo, nextTodo) => todo.id - nextTodo.id,
      );

    default:
      throw Error('localStorage 혹은 sessionStorage 에서 선택해주세요');
  }
};
