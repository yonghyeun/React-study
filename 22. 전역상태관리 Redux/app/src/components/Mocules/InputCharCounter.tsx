import Input from 'components/Atoms/Input';

const InputCharCounter = () => {
  // TODO state 에서 받아와 defaultValue 로 설정하기
  const increaseNum = 2;

  return <Input defaultValue={increaseNum} />;
};

export default InputCharCounter;
