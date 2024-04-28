import { getAuthtoken } from "@/actions/getAuthtoken";
import { IGetUsers } from "@/types/customer";
import { IGetOrder, IGetOrders, IOrder, IOrderUpdate } from "@/types/order";
import {
  IGetProduct,
  IGetProducts,
  IGetProductsInfinity,
} from "@/types/product";
import { IReview } from "@/types/reviews";

class FetchClass {
  private token = "";
  readonly baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "";

  get headers(): HeadersInit {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.token}`,
    };
  }

  async initializeToken() {
    return await getAuthtoken();
  }

  async get(url: string) {
    await this.ensureToken();
    return fetch(this.baseUrl + url, {
      headers: this.headers,
      //credentials: 'include'
    });
  }
  async post<TBody>(url: string, body: TBody) {
    await this.ensureToken();
    return fetch(this.baseUrl + url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
      //credentials: "include",
    });
  }
  async put<TBody>(url: string, body: TBody) {
    await this.ensureToken();
    return fetch(this.baseUrl + url, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(body),
      //credentials: "include",
    });
  }
  async delete(url: string) {
    await this.ensureToken();
    return fetch(this.baseUrl + url, {
      method: "DELETE",
      headers: this.headers,
      //credentials: "include",
    });
  }

  private async ensureToken() {
    if (!this.token) {
      this.token = await this.initializeToken();
    }
  }
}

export const FetchData = new FetchClass();

export const getProducts = async (query: string) => {
  const res = await FetchData.get(`/products?query=${query}`);
  return (await res.json()) as IGetProducts;
};

export const getProductsInfinity = async (page: number) => {
  const res = await FetchData.get(`/products?page=${page}`);
  return (await res.json()) as IGetProductsInfinity;
};

export const getProduct = async (id: string) => {
  const res = await FetchData.get(`/products/${id}`);
  return (await res.json()) as IGetProduct;
};

export const getAmountProducts = async () => {
  const res = await FetchData.get("/products/amount");
  return (await res.json()) as { msg: string; data: number };
};

export const getUsers = async () => {
  const res = await FetchData.get("/users");
  return (await res.json()) as IGetUsers;
};

export const getOrders = async (query: string) => {
  const res = await FetchData.get(`/orders?query=${query}`);
  return (await res.json()) as IGetOrders;
};

export const getAmountOrders = async () => {
  const res = await FetchData.get("/orders/amount");
  return (await res.json()) as { msg: string; data: number };
};

export const getAmountOrdersPending = async () => {
  const res = await FetchData.get(`/orders/amount?status=pending`);
  return (await res.json()) as { msg: string; data: number };
};

export const getRevenue = async () => {
  const res = await FetchData.get("/orders/revenue");
  return (await res.json()) as { msg: string; data: number };
};

export const getSales = async (year: number) => {
  const res = await FetchData.get(`/orders/sales_by_months/${year}`);
  return (await res.json()) as {
    msg: string;
    data: { _id: { month: number }; totalSales: number }[];
  };
};

export const updateOrder = async (id: string, data: IOrderUpdate<IOrder>) => {
  const res = await FetchData.put("/orders/" + id, data);
  return (await res.json()) as IGetOrder;
};

export const getReviews = async (
  value: "has been checked" | "has not been checked"
) => {
  const res = await FetchData.get(
    "/reviews" + "?checked=" + (value === "has been checked" ? true : false)
  );
  return (await res.json()) as { msg: string; data: IReview[] };
};

export const getReviewsInfinity = async (page: number) => {
  const res = await FetchData.get(`/reviews?checked=false&page=${page}`);
  return (await res.json()) as {
    msg: string;
    data: { lastPage: number; nextPage: number; reviews: IReview[] };
  };
};
