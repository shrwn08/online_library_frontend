import MobileMenu from "./MobileMenu.jsx";
import TabletMenu from "./TabletMenu.jsx";
import { useContext, useState } from "react";
import { ContextApp } from "../contextapi/ContextApi.jsx";
import BookLogo from "../assets/books.svg";
import { uploadBook } from "../Redux/slices/BooksSlice.js";
import { useDispatch } from "react-redux";

const UploadBook = () => {
  const { mobileMenuOpen, theme } = useContext(ContextApp);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    category: "",
    avatar: null,
  });
  const [formError, setFormError] = useState(false);

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setFormData({ ...formData, avatar: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, author, description, category, avatar } = formData;
    if (!title || !author || !description || !category || !avatar) {
      setFormError(true);
      return;
    }

    const data = new FormData();
    data.append("title", title);
    data.append("author", author);
    data.append("description", description);
    data.append("category", category);
    data.append("avatar", avatar);
    try {
      await dispatch(uploadBook(data));
      setFormData({
        title: "",
        author: "",
        description: "",
        category: "",
        avatar: null,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setFormError(false);
    }
  };
  return (
    <div className="relative flex flex-col md:flex-row justify-center items-center">
      {!mobileMenuOpen && <MobileMenu />}
      {!mobileMenuOpen && <TabletMenu />}
      {/*================================================================================*/}

      <div className="book-image hidden w-1/2 sm:h-[91.6vh]  md:flex flex-col justify-center items-center ">
        <img src={BookLogo} alt="Book Logo" style={{ width: "50%" }} />
        <p
          className="text-4xl font-bold font-italic"
          style={{ color: theme ? "black" : "white" }}
        >
          Today a reader, tomorrow a leader.
        </p>
      </div>
      <p
        className="text-4xl font-bold font-italic text-center md:hidden"
        style={{ color: theme ? "black" : "white" }}
      >
        Today a reader, tomorrow a leader.
      </p>
      <div className="form-container w-full sm:w-2/3  md:w-1/2 sm:h-[91.6vh] flex mt-2 md:mt-0 justify-center items-center ">
        <form
          onSubmit={handleSubmit}
          method="post"
          className=" w-11/12 md:w-1/2 border-2 border-[#222222] rounded-lg py-3 flex flex-col gap-1"
          style={{
            color: theme ? "black" : "white",
            backgroundColor: theme ? "white" : "black",
          }}
        >
          <p
            className="text-3xl font-semibold px-2"
            style={{ color: theme ? "black" : "white" }}
          >
            Add Books
          </p>
          <div className="px-2 flex justify-between items-center h-10">
            <label className="h-8 text-normal font-semibold">Title :</label>
            <input
              type="text"
              value={formData.title}
              onChange={handleChange}
              name="title"
              className="h-8 w-64 px-3 rounded-sm"
              style={{ border: theme ? "1px solid black" : "1px solid white" }}
            />
          </div>
          <div className="px-2 flex justify-between items-center h-10">
            <label className="h-8 text-normal font-semibold">Author :</label>
            <input
              type="text"
              onChange={handleChange}
              value={formData.author}
              name="author"
              className="h-8 w-64 px-3 rounded-sm"
              style={{ border: theme ? "1px solid black" : "1px solid white" }}
            />
          </div>

          <div className="px-2 flex justify-between items-center h-10">
            <label className="h-8 text-normal font-semibold">Category :</label>
            <input
              type="text"
              value={formData.category}
              name="category"
              onChange={handleChange}
              className="h-8 w-64 px-3 rounded-sm"
              style={{ border: theme ? "1px solid black" : "1px solid white" }}
            />
          </div>
          <div className="px-2 flex justify-between items-center h-10">
            <label className="h-8 text-normal font-semibold">Avatar :</label>
            <input
              type="file"
              name={"avatar"}
              onChange={handleChange}
              className="h-8 w-64 px-3 rounded-sm"
              style={{ border: theme ? "1px solid black" : "1px solid white" }}
            />
          </div>
          <div className="px-2 flex justify-between items-center h-24">
            <label className="h-8 text-normal font-semibold">
              Description :
            </label>
            <textarea
              onChange={handleChange}
              value={formData.description}
              name="description"
              className="h-full w-64 px-3 rounded-sm"
              style={{ border: theme ? "1px solid black" : "1px solid white" }}
            />
          </div>
          {formError && (
            <p className=" text-red-500 font-normal text-center">
              All fields are required
            </p>
          )}
          <div className="px-2 flex justify-between items-center h-10">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white h-8 rounded-md hover:cursor-pointer hover:bg-blue-700"
            >
              {uploading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadBook;
