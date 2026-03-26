import "./index.css";
import { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout.jsx";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { I18nProvider } from "./i18n/I18nProvider.jsx";
import PageSkeleton from "./components/PageSkeleton.jsx";
import { HelmetProvider } from "react-helmet-async";

const AppPage = lazy(() => import("./App.jsx"));
const AboutPage = lazy(() => import("./pages/About.jsx"));
const BlogListPage = lazy(() => import("./pages/BlogList.jsx"));
const BlogPostPage = lazy(() => import("./pages/BlogPost.jsx"));
const ProfilePage = lazy(() => import("./pages/Profile.jsx"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetail.jsx"));
const AuthPage = lazy(() => import("./pages/Auth.jsx"));
const BloggerPage = lazy(() => import("./pages/Blogger.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFound.jsx"));

const withRouteLoader = (element, variant = "default") => {
  return (
    <Suspense fallback={<PageSkeleton variant={variant} />}>
      {element}
    </Suspense>
  );
};

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: withRouteLoader(<AppPage />, "home"),
      },
      {
        path: "/about",
        element: withRouteLoader(<AboutPage />, "about"),
      },
      {
        path: "/blogs",
        element: withRouteLoader(<BlogListPage />, "blogList"),
      },
      {
        path: "/blog-post",
        element: (
          <ProtectedRoute>
            {withRouteLoader(<BlogPostPage />, "blogPost")}
          </ProtectedRoute>
        ),
      },
      {
        path: "/blogs/:uuid",
        element: withRouteLoader(<BlogDetailPage />, "blogDetail"),
      },
      {
        path: "/bloggers/:uuid",
        element: withRouteLoader(<BloggerPage />, "blogger"),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            {withRouteLoader(<ProfilePage />, "profile")}
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: withRouteLoader(<NotFoundPage />, "notFound"),
      },
    ],
  },
  {
    path: "/auth",
    element: withRouteLoader(<AuthPage />, "auth"),
  },
  {
    path: "*",
    element: withRouteLoader(<NotFoundPage />, "notFound"),
  },
];

const router = createBrowserRouter(routes, {
  future: {
    v7_startTransition: true,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <HelmetProvider>
      <I18nProvider>
        <RouterProvider router={router} />
      </I18nProvider>
    </HelmetProvider>
  </Provider>,
);
