import { useState, useRef, createContext, useContext } from 'react';

const RefContext = createContext(null);
const StarContext = createContext(null);
const SetterContext = createContext(null);

export function ContextProvider({ children }) {
  const lastStarRef = useRef(null);
  const [stars, setStars] = useState([
    <div key={1}>⭐</div>,
    <div key={2}>⭐</div>,
    <div key={3} ref={lastStarRef}>
      ⭐
    </div>,
  ]);

  return (
    <RefContext.Provider value={lastStarRef}>
      <StarContext.Provider value={stars}>
        <SetterContext.Provider value={setStars}>
          {children}
        </SetterContext.Provider>
      </StarContext.Provider>
    </RefContext.Provider>
  );
}

export function useRefContext() {
  return useContext(RefContext);
}

export function useStarContext() {
  return useContext(StarContext);
}

export function useSetterContext() {
  return useContext(SetterContext);
}
