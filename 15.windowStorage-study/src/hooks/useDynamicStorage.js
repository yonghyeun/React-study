import { useContext } from 'react';
import { LocalStorageContext, SessionStorageContext } from '../context/Context';

export default function useDynamicStorage(storageName) {
  const localState = useContext(LocalStorageContext);
  const sessionState = useContext(SessionStorageContext);

  return storageName === 'localStorage' ? localState : sessionState;
}
