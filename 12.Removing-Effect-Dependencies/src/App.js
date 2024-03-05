import ChatRoom from './Component/ChatRoom';
import Selector from './Component/Selector';
import { ConnectionProvider } from './Core/connectionContext';

export default function App() {
  return (
    <ConnectionProvider>
      <Selector />
      <ChatRoom />
    </ConnectionProvider>
  );
}
