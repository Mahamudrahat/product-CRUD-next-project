import axios from "axios";

const API_BASE_URL = "https://crud.teamrabbil.com/api/v1";

export const getProductList = async () => {
  const response = await axios.get(`${API_BASE_URL}/ReadProduct`);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axios.post(`${API_BASE_URL}/CreateProduct`, productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await axios.post(`${API_BASE_URL}/UpdateProduct/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/DeleteProduct/${id}`);
  return response.data;
};

export const getProductDetailsById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/ReadProductByID/${id}`);
  return response.data;
};
