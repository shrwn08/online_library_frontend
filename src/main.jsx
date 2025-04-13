import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.jsx";
import BrowseBooks from "./components/BrowseBooks.jsx";
import BookDetailPage from "./components/BookDetailPage.jsx";
import UploadBook from "./components/UploadBook.jsx";
import { ProviderApp } from "./contextapi/ContextApi.jsx";
import { Provider } from "react-redux";
import { store } from "./Redux/store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App can wrap a layout like Header + Outlet
    children: [
      { index: true, element: <Home /> },
      { path: "books", element: <BrowseBooks /> },
      { path: "books/:id", element: <BookDetailPage /> },
      { path: "upload-book", element: <UploadBook /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ProviderApp>
        <RouterProvider router={router} />
      </ProviderApp>
    </Provider>
  </StrictMode>,
);
