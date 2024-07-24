
import axios from 'axios';

const BASE_URL = 'https://pilse-and-pills.el.r.appspot.com/api';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`); // Assuming '/products' is the endpoint for fetching products
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const fetchProductCount = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products/count`);
    return response.data.count;
  } catch (error) {
    throw error;
  }
};

export const fetchCategoryCount = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories/count`);
    return response.data.count;
  } catch (error) {
    throw error;
  }
};


export const updateProduct = async (productId, productData) => {
  try {
    const response = await axios.put(`${BASE_URL}/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};