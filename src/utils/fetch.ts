import { IGetProducts, IProduct } from "@/types/product";
import axios from "axios";

export const Fetch = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

export const getProducts = async () => {
  const res = await Fetch('/products')
  return res.data as IGetProducts
}