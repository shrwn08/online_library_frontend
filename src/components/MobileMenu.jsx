import SearchBar from "./SearchBar.jsx";
import { Link } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useContext } from "react";
import { ContextApp } from "../contextapi/ContextApi.jsx";

const MobileMenu = () => {
  const { theme, handleThemeBtn } = useContext(ContextApp);

  return (
    <div className="min-h-[90vh] w-3/5 bg-zinc-300 z-20 absolute top-0 right-0">
      <div className=" w-full relative flex flex-col gap-4">
        <div className="w-full px-2 absolute top-4 ">
          <div className="border-b-1 border-zinc-600/30 h-8">
            <Link to="/">Home</Link>
          </div>
          <div className="border-b-1 border-zinc-600/30  h-8">
            <Link to="/books">Browse Books</Link>
          </div>
          <div className="border-b-1 border-zinc-600/30  h-8">
            <Link to="/upload-book">Add Books</Link>
          </div>

          <div className="w-full  h-16 border-b-1 border-zinc-600/30 flex justify-start items-center ">
            <SearchBar />
          </div>
          <div
            onClick={handleThemeBtn}
            className="w-16 h-8 border-2 border-double rounded-full mt-3 relative bg-zinc-600 "
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
    </div>
  );
};

export default MobileMenu;
