import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "../layout";
import Home from "../pages/home";
import Login from "../pages/login";
import Products from "../pages/products";
import Orders from "../pages/orders";
import NotFound from "../pages/notFound";
import OrderDetails from "../pages/orderDetails";
import ProductDetails from "../pages/productsDetails";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="orders/:id" element={<OrderDetails />} />
        <Route path="*" element={<NotFound />} />
        <Route path="details" element={<ProductDetails />} />
      </Route>
    </>,
  ),
);

export default router;
