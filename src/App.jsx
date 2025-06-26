import { RouterProvider , createBrowserRouter , createRoutesFromElements , Route } from "react-router-dom"

import Layout from "./components/layout"
import Home , {loader as homeLoader} from "./pages/home/home"
import Products , {loader as productsLoader} from "./pages/products/products"
import ProductsDetails , {loader as productsDetailsLoader } from "./pages/products/productsDetails"
import ProdDetail from "./pages/products/porductInfo/prodDetail"
import ProductReviews from "./pages/products/porductInfo/productReview"
import ProductImages from "./pages/products/porductInfo/productImges"

export default function App(){
  const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<Layout/>} >
      <Route index element={<Home/>} loader={homeLoader}/>
      <Route path="products" element={<Products/>} loader={productsLoader} />
      <Route path="products/:id" element={<ProductsDetails/>} loader={productsDetailsLoader}>
         <Route index element={<ProdDetail/>}/>
         <Route path="reviews" element={<ProductReviews/>} />
         <Route path="images" element={<ProductImages/>} />
      </Route>
    </Route>
  ))
  return(
    <>
     <RouterProvider router={router} /> 
    </>
  )
}