import style from './styles.module.css';
import Nav from '../Nav/Nav';
const Header = () => {
  return (
    <header className={style.headers}>
      <h1 className={style.title}>프론트엔드 똥손단</h1>
      <Nav />
    </header>
  );
};

export default Header;
