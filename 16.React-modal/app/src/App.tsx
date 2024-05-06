import './App.css';
import ModalProvider from './Context/Provider';
import Wrapper from './components/Wrapper/Wrapper';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import GlobalModalWrapper from './components/GlobalModalWrapper/GlobalModalWrapper';
function App() {
  return (
    <ModalProvider>
      <Wrapper>
        <Header />
        <Content />
        <GlobalModalWrapper />
      </Wrapper>
    </ModalProvider>
  );
}

export default App;
