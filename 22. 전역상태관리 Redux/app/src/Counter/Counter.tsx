import Flex from 'components/Atoms/Flex';
import Count from 'components/Atoms/Count';
import ReduxLogo from 'components/Atoms/Logo';

import { AddButton, SubtractButton } from 'components/Mocules/CounterButton';
import InputCharCounter from 'components/Mocules/InputCharCounter';
import AsyncAddButton from 'components/Mocules/AsyncAddButton';
import SyncAddButton from 'components/Mocules/SyncAddButton';
import OddAddButton from 'components/Mocules/OddAddButton';

const Counter: React.FC = () => {
  return (
    <section>
      <Flex direction='column'>
        <ReduxLogo />
        <Flex>
          <AddButton /> {/* 1 씩 num 을 증가시키는 컴포넌트 */}
          <Count />
          <SubtractButton /> {/* 1 씩 num 을 감소시키는 컴포넌트 */}
        </Flex>
        <Flex>
          <InputCharCounter /> {/* Sync,AsyncAdd 버튼의 증가량 */}
          <SyncAddButton /> {/* 동기적으로 증가시키는 컴포넌트 */}
          <AsyncAddButton /> {/* 비동기적으로 증가시키는 컴포넌트 */}
          <OddAddButton /> {/* 증가량이 홀수라면 증가시키는 컴포넌트 */}
        </Flex>
      </Flex>
    </section>
  );
};

export default Counter;
