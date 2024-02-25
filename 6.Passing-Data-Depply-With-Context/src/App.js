import './App.css';
import { createContext, useContext } from 'react';

// CreateContext 에서 처음으로 들어간 defaultContext 는 Provider 에서
// value 값을 정해주지 않았을 때 사용할 초기값

export default function App() {
  return (
    <FirstComponent ownProps={{ backgroundColor: 'orange' }}>
      <SecondComponent ownProps={{ backgroundColor: 'red' }}>
        <ThridComponent ownProps={{ backgroundColor: 'blue' }}>
          <LeafComponent ownProps={{ backgroundColor: 'green' }} />
        </ThridComponent>
      </SecondComponent>
    </FirstComponent>
  );
}

function FirstComponent({ ownProps, children }) {
  return <div style={ownProps}>{children}</div>;
}

function SecondComponent({ ownProps, children }) {
  return <div style={ownProps}>{children}</div>;
}

function ThridComponent({ ownProps, children }) {
  return <div style={ownProps}>{children}</div>;
}

function LeafComponent({ ownProps }) {
  // LeafContext 에서 제공하는 value 값을 ContextReceived에 담아준다.
  return <div style={ownProps}></div>;
}
