import "./index.css";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./pages/About.jsx";
import BlogList from "./pages/BlogList.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import Profile from "./pages/Profile.jsx";
import BlogDetail from "./pages/BlogDetail.jsx";
import Layout from "./layout.jsx";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import LoginPage from "./pages/Auth.jsx";
import Blogger from "./pages/Blogger.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { I18nProvider } from "./i18n/I18nProvider.jsx";
import NotFound from "./pages/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
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
        element: (
          <ProtectedRoute>
            <BlogPost />
          </ProtectedRoute>
        ),
      },
      {
        path: "/blogs/:uuid",
        element: <BlogDetail />,
      },
      {
        path: "/bloggers/:uuid",
        element: <Blogger />,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/auth",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>
  </Provider>,
);
