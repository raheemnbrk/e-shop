import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const addProductApi = async (infos: FormData) => {
  const res = await axios.post("/api/products/add-product", infos, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const getProductsApi = async (title?: string) => {
  const res = await axios.get("/api/products/get-products", {
    params: title ? { title } : {},
  });
  return res.data;
};

export const deleteProductApi = async (id: string) => {
  const res = await axios.post("/api/products/delete-product", { id });
  return res.data;
};

export const updateProductApi = async (formData: FormData) => {
  const res = await axios.post("/api/products/update-product", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
