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

export const removeStorageItem = (storageName, key, value) => {
  switch (storageName) {
    case 'localStorage':
      window.localStorage.removeItem(key, value);
      break;
    case 'sessionStorage':
      window.sessionStorage.removeItem(key, value);
      break;
    default:
      throw Error('localStorage 혹은 sessionStorage 에서 선택해주세요');
  }
};
