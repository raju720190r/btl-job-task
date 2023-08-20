import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FormOne from './components/FormOne.jsx';
import FormTwo from './components/FormTwo.jsx';
import App from './App';
import ResultsPage from './components/ResultsPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "formOne",
    element: <FormOne />,
  },

  {
    path: "formTwo",
    element: <FormTwo/>,
  }, {
    path: "results",
    element:<ResultsPage/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
