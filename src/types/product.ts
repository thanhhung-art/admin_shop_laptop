export interface IProduct {
  _id: string;
  name: string;
  price: number;
  descriptions: string;
  instock: string;
  img: string;
  categories: string;
  rating?: number;
  color: string | string[];
  brand: string;
  weight: string;
  updatedAt: string;

  configure: {
    ram: string;
    hardDisk: string;
    cpu: string;
    screen: string;
    camera: string;
    battery: string;
    os: string;
    gpu: string;
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
