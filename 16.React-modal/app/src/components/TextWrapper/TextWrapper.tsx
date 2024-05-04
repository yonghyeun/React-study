import { ReactNode } from 'react';
import style from './style.module.css';

type Props = {
  children: ReactNode;
};

type Composition = {
  Title: React.FC;
  Text: React.FC;
};

const TextWrapper: React.FC<Props> & Composition = ({ children }) => {
  return <span>{children}</span>;
};

TextWrapper.Title = () => {
  return (
    <section className={style.titleWrapper}>
      <h1 className={style.mainTitle}>프론트엔드 똥손단을 모집합니다.</h1>
      <h2 className={style.subTitle}>
        가입 버튼을 눌러 프론트엔드 똥손단에 가입하세요
      </h2>
    </section>
  );
};

TextWrapper.Text = () => {
  return (
    <span className={style.textWrapper}>
      <p>더 똥같은 디자인 , 더 똥같은 컴포넌트</p>
      <p>똥손단과 함께하세요</p>
    </span>
  );
};

export default TextWrapper;
