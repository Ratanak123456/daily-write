import "./index.css";
import { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout.jsx";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { I18nProvider } from "./i18n/I18nProvider.jsx";

const AppPage = lazy(() => import("./App.jsx"));
const AboutPage = lazy(() => import("./pages/About.jsx"));
const BlogListPage = lazy(() => import("./pages/BlogList.jsx"));
const BlogPostPage = lazy(() => import("./pages/BlogPost.jsx"));
const ProfilePage = lazy(() => import("./pages/Profile.jsx"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetail.jsx"));
const AuthPage = lazy(() => import("./pages/Auth.jsx"));
const BloggerPage = lazy(() => import("./pages/Blogger.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFound.jsx"));

const withRouteLoader = (element) => {
  return (
    <Suspense
      fallback={
        <div className="min-h-[40vh] flex items-center justify-center text-primary-orange font-semibold">
          Loading...
        </div>
      }
    >
      {element}
    </Suspense>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: withRouteLoader(<AppPage />),
      },
      {
        path: "/about",
        element: withRouteLoader(<AboutPage />),
      },
      {
        path: "/blogs",
        element: withRouteLoader(<BlogListPage />),
      },
      {
        path: "/blog-post",
        element: (
          <ProtectedRoute>
            {withRouteLoader(<BlogPostPage />)}
          </ProtectedRoute>
        ),
      },
      {
        path: "/blogs/:uuid",
        element: withRouteLoader(<BlogDetailPage />),
      },
      {
        path: "/bloggers/:uuid",
        element: withRouteLoader(<BloggerPage />),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            {withRouteLoader(<ProfilePage />)}
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: withRouteLoader(<NotFoundPage />),
      },
    ],
  },
  {
    path: "/auth",
    element: withRouteLoader(<AuthPage />),
  },
  {
    path: "*",
    element: withRouteLoader(<NotFoundPage />),
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>
  </Provider>,
);
