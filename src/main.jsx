import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ShoppingPage from './components/ShoppingPage.jsx';
import CheckoutPage from './components/CheckoutPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ShoppingPage/>,
  },
  {
    path: "/checkout",
    element: <CheckoutPage/>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
