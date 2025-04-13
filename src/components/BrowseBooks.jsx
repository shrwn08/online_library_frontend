import { useContext } from "react";
import { ContextApp } from "../contextapi/ContextApi.jsx";
import MobileMenu from "./MobileMenu.jsx";
import TabletMenu from "./TabletMenu.jsx";

const BrowseBooks = () => {
  const { mobileMenuOpen } = useContext(ContextApp);
  return (
    <div className="relative ">
      {!mobileMenuOpen && <MobileMenu />}
      {!mobileMenuOpen && <TabletMenu />}I am a BrowserBook Component
    </div>
  );
};

export default BrowseBooks;
