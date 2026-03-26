import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addProductApi,
  deleteProductApi,
  getProductsApi,
  updateProductApi,
} from "../../api/admin/product";
import { useDashboard } from "../../zustand/dashboard";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useDashboardQueries } from "./dashboard";

export const useProduct = (title: string) => {
  const setProducts = useDashboard((state) => state.setProducts);
  let products = useDashboard((state) => state.products);
  const { getStats } = useDashboardQueries();
  const addProduct = useMutation({
    mutationFn: addProductApi,
    onSuccess: (data) => {
      if (data.success) {
        setProducts([...products, data.newProduct]);
        toast.success(data.message);
        getStats.refetch()
      } else toast.error("adding product failed");
    },
    onError: () => {
      toast.error("Something went wrong.");
    },
  });

  const getAllProducts = useQuery({
    queryKey: ["products", title],
    queryFn: () => getProductsApi(title),
  });

  const { data, isSuccess, isError } = getAllProducts;

  useEffect(() => {
    if (isSuccess && data) {
      if (data.success) {
        setProducts(data.products);
        getStats.refetch();
      } else toast.error("Something went wrong");
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isError]);

  const deleteProduct = useMutation({
    mutationFn: deleteProductApi,
    onSuccess: (data) => {
      if (data.success) {
        setProducts(
          products.filter((prod) => prod._id !== data.deletedProductId),
        );
        getStats.refetch();
        toast.success(data.message);
      } else {
        toast.error("Failed to delete product");
      }
    },
    onError: () => {
      toast.error("Something went wrong.");
    },
  });

  const updateProduct = useMutation({
    mutationFn: (formData: FormData) => updateProductApi(formData),
    onSuccess: (data) => {
      if (data.success) {
        setProducts(
          products.map((ele) =>
            ele._id === data.updatedProduct._id ? data.updatedProduct : ele,
          ),
        );
        toast.success(data.message);
      } else {
        toast.error("Update failed");
      }
    },
    onError: () => {
      toast.error("Something went wrong during update");
    },
  });

  return { addProduct, getAllProducts, deleteProduct, updateProduct };
};
