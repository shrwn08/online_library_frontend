import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  return (
    <div className="search-header ">
      <form className=" border-1 border-white w-48 sm:w-56  md:w-64 rounded-md bg-white overflow-hidden flex justify-center items-center  ">
        <input
          placeholder="Search your books..."
          className="w-4/5 h-10 border-transparent rounded-md px-2 text-sm sm:lg"
        />
        <button className="w-1/5 h-10 border-l-1 border-gray-200">
          <SearchIcon sx={{ fontSize: "2rem" }} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
