import { IGetUsers } from "@/types/customer";
import { IGetOrder, IGetOrders, IOrder, IOrderUpdate } from "@/types/order";
import {
  IGetProduct,
  IGetProducts,
  IGetProductsInfinity,
} from "@/types/product";
import { IReview } from "@/types/reviews";
import axios from "axios";

const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
let token = "";

export const Fetch = axios.create({
  baseURL: server_url,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Fetch.interceptors.request.use(
//   (config) => {
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export const getProducts = async (query: string) => {
  const res = await Fetch(`/products?query=${query}`);
  return res.data as IGetProducts;
};

export const getProductsInfinity = async (page: number) => {
  const res = await Fetch(`/products?page=${page}`);
  return res.data as IGetProductsInfinity;
};

export const getProduct = async (id: string) => {
  const res = await Fetch(`/products/${id}`);
  return res.data as IGetProduct;
};

export const getAmountProducts = async () => {
  const res = await Fetch("/products/amount");
  return res.data as { msg: string; data: number };
};

export const getUsers = async () => {
  const res = await Fetch("/users");
  return res.data as IGetUsers;
};

export const getOrders = async (query: string, authtoken?: string) => {
  if (authtoken && !token) token = authtoken;
  const res = await Fetch(`/orders?query=${query}`);
  return res.data as IGetOrders;
};

export const getAmountOrders = async (authtoken?: string) => {
  if (authtoken && !token) token = authtoken;
  const res = await Fetch("orders/amount");
  return res.data as { msg: string; data: number };
};

export const getAmountOrdersPending = async (authtoken?: string) => {
  if (authtoken && !token) token = authtoken;
  const res = await Fetch(`orders/amount?status=pending`);
  return res.data as { msg: string; data: number };
};

export const getRevenue = async () => {
  const res = await Fetch("orders/revenue");
  return res.data as { msg: string; data: number };
};

export const getSales = async (year: number, authtoken?: string) => {
  if (authtoken && !token) token = authtoken;
  const res = await Fetch(`orders/sales_by_months/${year}`);
  return res.data as {
    msg: string;
    data: { _id: { month: number }; totalSales: number }[];
  };
};

export const updateOrder = async (id: string, data: IOrderUpdate<IOrder>) => {
  const res = await Fetch.put("/orders/" + id, data);
  return res.data as IGetOrder;
};

export const getReviews = async (
  value: "has been checked" | "has not been checked"
) => {
  const res = await Fetch(
    "/reviews" + "?checked=" + (value === "has been checked" ? true : false)
  );
  return res.data as { msg: string; data: IReview[] };
};

export const getReviewsInfinity = async (page: number) => {
  const res = await Fetch(`/reviews?checked=false&page=${page}`);
  return res.data as {
    msg: string;
    data: { lastPage: number; nextPage: number; reviews: IReview[] };
  };
};

const checkauth_url = process.env.NEXT_PUBLIC_CHECKAUTH_URL || "";
export async function checkauth(
  authtoken: string | undefined
): Promise<{ isadmin: boolean }> {
  if (authtoken) {
    const res = await fetch(checkauth_url, {
      headers: {
        Authorization: `Bearer ${authtoken}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) return { isadmin: false };
    return res.json();
  }
  return { isadmin: false };
}
