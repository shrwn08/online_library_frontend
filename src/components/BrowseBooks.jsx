import { useContext, useEffect } from "react";
import { ContextApp } from "../contextapi/ContextApi.jsx";
import MobileMenu from "./MobileMenu.jsx";
import TabletMenu from "./TabletMenu.jsx";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import {
  fetchBookDetail,
  fetchCategoryBooks,
} from "../Redux/slices/BooksSlice.js";
import { useDispatch, useSelector } from "react-redux";

const BrowseBooks = () => {
  const { mobileMenuOpen, theme } = useContext(ContextApp);
  const dispatch = useDispatch();
  const { categoryBook, isLoading, isError, errorMessage } = useSelector(
    (state) => state.books,
  );

  if (isError) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="text-red-500 font-semibold">{errorMessage}</div>
      </div>
    );
  }

  const handleCategoryBooksBtn = async (category) => {
    const newCategory = category.toLocaleString()
    await dispatch(fetchCategoryBooks(newCategory))
  }

  console.log(categoryBook.books);
  return (
    <div className="relative md:min-h-[91.5vh] w-full">
      {!mobileMenuOpen && <MobileMenu />}
      {!mobileMenuOpen && <TabletMenu />}

      <div className="h-full w-full flex justify-center items-center flex-col gap-3">
        <div className="flex justify-start items-center">
          <p className="text-left text-3xl font-bold">All Books</p>
        </div>
        <div className="flex justify-center items-center gap-3 flex-wrap">
          {["Fiction", "Anime", "Si-Fi", "Romance", "Fantasy", "Horror"].map(
            (item, i) => (
              <button
                key={i}
                className="h-8 w-20 border-1 border-black rounded-md hover:cursor-pointer"
                onClick={()=>handleCategoryBooksBtn(item)
                }
              >
                {item}
              </button>
            ),
          )}
        </div>
        <div
          className="flex flex-col sm:flex-row sm:flex-wrap gap-3 h-auto w-11/12 py-5 md:justify-start justify-center items-center bg-[#F4F8D3]"
          style={{ backgroundColor: theme ? "#f5f1f9" : "#222222" }}
        >
          {/* Cards */}
          {isLoading ? (
            <div className="w-full h-64 flex justify-center items-center">
              <CircularProgress />
            </div>
          ) : categoryBook.books && categoryBook.books.length > 0 ? (
            categoryBook.books.map((book) => (
              <Link to={`/books/${book._id}`} key={book._id}>
                <div
                  onClick={() => dispatch(fetchBookDetail(book._id))}
                  className="w-4/5 h-96 hover:scale-105 transition-transform duration-300 bg-white border-2 border-[#f5f1f9] flex justify-center items-center rounded-lg relative sm:w-64"
                >
                  <div className="book-cover h-auto w-60">
                    <img
                      src={book.avatar}
                      alt={`${book.title} cover`}
                      className="w-full"
                    />
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
              </Link>
            ))
          ) : (
            <p className="text-white text-lg">No books found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseBooks;
