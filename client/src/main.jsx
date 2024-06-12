import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx';
import ErrorPage from './pages/Error.jsx';
import Home from './pages/Home';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/Login.jsx';
import Profile from './pages/settings/profile.jsx';
import Account from './pages/settings/account.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/login',
        element: <SignIn />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/account',
        element: <Account />
      },
      {
        path: '/profile',
        element: <Profile />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
