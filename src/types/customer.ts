export interface ICustomer {
  id: string;
  address: {
    city: string;
    country: string;
    state?: string;
    street: string;
    name?: undefined | string;
  };
  avatar: string;
  createdAt: Date;
  email: string;
  name: string;
  phone: string;
}

export interface TableData extends ICustomer {
  [key: string]: any
}