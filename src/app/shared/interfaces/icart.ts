import { IProduct } from "./iproduct"

export interface ICart {
    _id: string
    cartOwner: string
    products: IProduct[]
    createdAt: string
    updatedAt: string
    __v: number
    totalCartPrice: number
    count: number
    product: IProduct
    price: number
}
