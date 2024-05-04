import style from './style.module.css';

const Nav = () => {
  return (
    <nav className={style.nav}>
      <ul>
        <li>채용 공고</li>
        <li>똥손단 정보</li>
        <li>똥손단 문화</li>
        <li>지원 정보</li>
      </ul>
    </nav>
  );
};

export default Nav;
