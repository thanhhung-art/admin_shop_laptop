export interface ICustomer {
  _id: string;
  username: string;
  createdAt: Date;
  email: string;
  isadmin: boolean;
  phone?: string;
  address?: string;
}

export interface TableData extends ICustomer {
  [key: string]: any
}

export interface IGetUsers {
  data: ICustomer[]
  msg: string
}