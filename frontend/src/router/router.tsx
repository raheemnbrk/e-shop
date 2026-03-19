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
import Description from "../components/products/description";
import Reviews from "../components/products/reviews";
import Specification from "../components/products/specifications";
import Cart from "../pages/cart";
import Dashboard from "../pages/dashboard";
import DashboardLayout from "../pages/dashboardLayout";

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
        <Route path="products/:id" element={<ProductDetails />}>
          <Route index element={<Description />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="specifications" element={<Specification />} />
        </Route>
        <Route path="cart" element={<Cart />} />
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Route>
    </>,
  ),
);

export default router;
