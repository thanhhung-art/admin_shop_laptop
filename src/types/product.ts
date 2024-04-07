export interface IProduct {
  _id: string;
  name: string;
  price: number;
  descriptions: string;
  instock: boolean;
  img: string;
  categories: string[];
  rating?: number;
  colors: { color: string, quantity: number }[];
  brand: string;
  weight: string;
  updatedAt: string;
  featured?: boolean;
  [key: string]: any;

  configure: {
    _id?: string;
    ram: string;
    hardDisk: string;
    cpu: string;
    screen: string;
    camera: string;
    battery: string;
    os: string;
    gpu: string;
    [key: string]: any;
  };
}

export interface IUpdateProduct {
  [key: string]: any;

  configure?: {
    [key: string]: any;
  };
}

interface IData {
  msg: string;
}

export interface IGetProducts extends IData {
  data: IProduct[];
}

export interface IGetProductsInfinity extends IData {
  data: {
    products: IProduct[];
    nextPage: number;
    lastPage: number;
  };
}

export interface IGetProduct extends IData {
  data: IProduct;
}
