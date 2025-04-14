import {useSelector} from "react-redux";
import MobileMenu from "./MobileMenu.jsx";
import TabletMenu from "./TabletMenu.jsx";
import {CircularProgress} from "@mui/material";
import {useContext} from "react";
import {ContextApp} from "../contextapi/ContextApi.jsx";

const BookDetailPage = () => {
  const {isError, errorMessage, isLoading, books} = useSelector((state) => state.books);
  const {mobileMenuOpen, theme} = useContext(ContextApp)

  if (isError) {
    return (
        <div className="w-full h-screen flex justify-center items-center">
          <div className="text-red-500 font-semibold">{errorMessage}</div>
        </div>
    );
  }

  console.log("Book detail page",books);
  return (
      <div className="relative md:min-h-[91.5vh] w-full">
        {!mobileMenuOpen && <MobileMenu />}
        {!mobileMenuOpen && <TabletMenu />}
        <div className="h-full w-full flex justify-center items-center">
          <div
              className="flex flex-col sm:flex-row sm:flex-wrap gap-3 h-auto py-4 w-11/12 py-5 md:justify-start justify-center items-center bg-[#F4F8D3]"
              style={{ backgroundColor: theme ? "#f5f1f9" : "#222222" }}
          >
            {/* Cards */}
            {isLoading ? (
                <div className="w-full h-64 flex justify-center items-center">
                  <CircularProgress />
                </div>
            ) :  (
                books &&
                (<div className="w-full h-[85vh] flex justify-center items-center gap-col-3 " >
                  <div className= " w-11/12 md:w-2/5 flex-col rounded-md p-4 flex sm:flex-row justify-center items-center gap-5 border-2 border-gray-300 bg-[#D4C9BE]">
                  <div className="">
                    <img src={books.book.avatar} alt={books.book.title} className="h-64" />
                  </div>
                  <div className="w-88">

                    <p className="text-2xl font-semibold">{books.book.title}</p>

                    <article className="text-normal text-md">{books.book.description}</article>
                    <p className="text-right text-md font-bold">:- {books.book.author}</p>

                    <div className='flex items-center justify-end gap-y-3'>
                    <label>Rate this book : </label>
                      <input type='number' className="w-12 h-8 bg-white" />
                    </div>
                  </div>
                </div>
                </div>)
            )}
          </div>
        </div>
      </div>
  )
};

export default BookDetailPage;
