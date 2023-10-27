export interface IOrder {
  _id: string
  userId: string
  username: string
  phone: string
  email?: string 
  address: string
  address2?: string
  products: {
    _id: string,
    productId: string,
    quantity: number,
  }[]
  payment: string
  status: string
  note: string
  totalPrice: number
  createdAt: string
}