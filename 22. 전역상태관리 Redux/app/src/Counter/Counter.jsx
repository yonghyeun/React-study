import Flex from '../components/Atoms/Flex';
import Count from '../components/Atoms/Count';
import ReduxLogo from '../components/Atoms/Logo';

import { AddButton, SubtractButton } from '../components/Mocules/CounterButton';
import InputCharCounter from 'components/Mocules/InputCharCounter';
import AsyncAddButton from 'components/Mocules/AsyncAddButton';
import SyncAddButton from 'components/Mocules/SyncAddButton';

const Counter = () => {
  return (
    <section>
      <Flex direction='column'>
        <ReduxLogo />
        <Flex>
          <AddButton />
          <Count />
          <SubtractButton />
        </Flex>
        <Flex>
          <InputCharCounter />
          <SyncAddButton />
          <AsyncAddButton />
        </Flex>
      </Flex>
    </section>
  );
};

export default Counter;
