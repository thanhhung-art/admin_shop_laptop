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

export interface IGetProducts {
  msg: string,
  data: IProduct[],
}