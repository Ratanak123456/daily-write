import "./index.css";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./pages/About.jsx";
import BlogList from "./pages/BlogList.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import Auth from "./pages/Auth.jsx";
import Profile from "./pages/Profile.jsx";
import BlogDetail from "./pages/BlogDetail.jsx";
import SaveBlog from "./pages/SaveBlog.jsx";
import Layout from "./layout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element:<App/>
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/blogs",
        element: <BlogList />,
      },
      {
        path: "/blog-post",
        element: <BlogPost />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/blog-detail",
        element: <BlogDetail />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/save-blog",
    element: <SaveBlog />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
