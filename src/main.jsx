import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home/Home.jsx'
import Store from './Store/Store.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//
import fakeStoreItem from "./Test/fakestore.json"
//


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "store",
    // element: <Store testItems={fakeStoreItem}/>,
    element: <Store />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
