import AddButton from './AddButton';
import RotateButton from './RotateButton';
import RemoveButtonV from './RemoveButtonV';
import RemoveButtonA from './RemoveButtonA';

export default function AllButtons() {
  return (
    <div className='button-wrapper'>
      <AddButton />
      <RotateButton />
      <RemoveButtonV />
      <RemoveButtonA />
    </div>
  );
}
