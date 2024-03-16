import Search from './ToolbarInner/Search';
import Theme from './ToolbarInner/Theme';
import Profile from './ToolbarInner/Profile';

export default function Toolbar() {
  return (
    <main id='toolbar'>
      <Search />
      <div>
        <Theme />
        <Profile />
      </div>
    </main>
  );
}
