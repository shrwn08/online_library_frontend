import { useContext, useEffect } from "react";
import { ContextApp } from "../contextapi/ContextApi.jsx";
import MobileMenu from "./MobileMenu.jsx";
import TabletMenu from "./TabletMenu.jsx";
import FamilyMatters from "../assets/family-matters.jpg";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../Redux/slices/BooksSlice.js";
import { CircularProgress } from "@mui/material";

const Home = () => {
  const { mobileMenuOpen, theme } = useContext(ContextApp);
  const dispatch = useDispatch();
  const { books, isLoading, isError, errorMessage } = useSelector(
    (state) => state.books,
  );

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (isError) {
    return (
      <div className="w-full h-screen">
        <div>{errorMessage}</div>
      </div>
    );
  }



  return (
    <div className="relative md:min-h-[91.5vh] w-full ">
      {!mobileMenuOpen && <MobileMenu />}
      {!mobileMenuOpen && <TabletMenu />}
      <div className="h-full w-full flex justify-center items-center ">
        <div
          className="flex flex-col sm:flex-row sm:flex-wrap gap-3   h-auto py-4 w-11/12 py-5 md:justify-start justify-center items-center bg-[#F4F8D3]"
          style={{ backgroundColor: theme ? "#f5f1f9" : "#222222" }}
        >
          {/*Cards*/}
          {isLoading ? (
            <CircularProgress />
          ) : (
            books.books &&
            books.books.length > 0 &&
            books.books.map((book) => (
              <div
                key={book._id}
                className="w-4/5 h-96 hover:scale-105 bg-white border-2 border-[#f5f1f9] flex justify-center items-center rounded-lg relative sm:w-64"
              >
                <div className="book-cover h-auto w-60">
                  <img src={book.avatar} alt="book-cover" className="w-full" />
                </div>
                <div className="bg-[rgb(255,255,255,0.5)] h-1/3 w-full absolute bottom-0 z-10 flex flex-col justify-center items-center gap-3 rounded-b-lg">
                  <p className="text-normal font-semibold text-[#000000]">
                    {book.title}
                  </p>
                  <p className="text-normal font-semibold text-[#000000]">
                    View Details
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
