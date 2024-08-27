import ControlBar from "./ControlBar";
import Search from "./Search";

function Header() {
  return (
    <div className="header">
      <Search />
      <ControlBar />
    </div>
  );
}

export default Header;
