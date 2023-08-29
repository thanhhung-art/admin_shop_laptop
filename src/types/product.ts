export interface IProduct {
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

  configure: {
    ram: string;
    hardDisk: string;
    cpu: string;
    screen: string;
    camera: string;
    battery: string;
    os: string;
    gpu: string;

    [key: string]: any
  };

  [key: string]: any
}

interface IData {
  msg: string
}

export interface IGetProducts extends IData {
  data: IProduct[],
}

export interface IGetProduct extends IData {
  data: IProduct
}