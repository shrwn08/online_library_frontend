import { Link } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import BookIcon from "../assets/books.svg";
import SearchBar from "./SearchBar.jsx";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useContext } from "react";
import { ContextApp } from "../contextapi/ContextApi.jsx";

const Header = () => {
  const {
    mobileMenuOpen,
    openMobileMenu,
    closeMobileMenu,
    handleThemeBtn,
    theme,
  } = useContext(ContextApp);

  return (
    <header className="App-header h-14 max-w-full bg-[#8E7DBE] flex justify-center items-center">
      <div className="App-header w-11/12  flex justify-between items-center">
        <div className="App-header__logo flex gap-2 items-center">
          <img src={BookIcon} alt="logo" className="w-10" />
          <p className="text-xl font-semibold">Library</p>
        </div>

        <div className="hidden sm:block">
          <SearchBar />
        </div>

        {/*Mobile menu icon*/}

        <div className="mobile_menu  md:hidden">
          {mobileMenuOpen ? (
            <div className="hover:cursor-pointer" onClick={openMobileMenu}>
              <MenuIcon />
            </div>
          ) : (
            <div className="hover:cursor-pointer" onClick={closeMobileMenu}>
              <CloseIcon />
            </div>
          )}
        </div>

        {/*Desktop*/}

        <div className="w-1/3 px-2  justify-between items-center hidden md:flex">
          <div className=" h-8 flex justify-center items-center hover:border-b-4 border-[rgb,(141,124,189)] ">
            <Link to="/">Home</Link>
          </div>
          <div className="  h-8 flex justify-center items-center hover:border-b-4 border-[rgb,(141,124,189)] ">
            <Link to="/books">Browse Books</Link>
          </div>
          <div className="  h-8 flex justify-center items-center hover:border-b-4 border-[rgb,(141,124,189)] ">
            <Link to="/upload-book">Add Books</Link>
          </div>

          <div
            onClick={handleThemeBtn}
            className="w-16 h-8 border-2 border-double rounded-full mt-3 relative bg-zinc-600 flex justify-center items-center hover:cursor-pointer"
          >
            {theme ? (
              <div className="absolute left-1 bg-black rounded-full top-0.5 flex justify-center ">
                <DarkModeIcon sx={{ color: "gray" }} />
              </div>
            ) : (
              <div className="absolute right-1 bg-black rounded-full top-0.5 flex justify-center ">
                <LightModeIcon sx={{ color: "yellow" }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
