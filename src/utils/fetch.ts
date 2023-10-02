import { IGetUsers } from "@/types/customer";
import { IGetProduct, IGetProducts, IProduct } from "@/types/product";
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

export const getProduct = async (id: string) => {
  const res = await Fetch(`/products/${id}`)
  return res.data as IGetProduct
}

export const getUsers = async () => {
  const res = await Fetch('/users')
  return res.data as IGetUsers
}