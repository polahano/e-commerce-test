import { ICart } from "./icart"
import { IUser } from "./iuser"

export interface IOrder {
    shippingAddress: ShippingAddress
    taxPrice: number
    shippingPrice: number
    totalOrderPrice: number
    paymentMethodType: string
    isPaid: boolean
    isDelivered: boolean
    _id: string
    user: IUser
    cartItems: ICart[]
    paidAt: string
    createdAt: string
    updatedAt: string
    id: number
    __v: number
}


export interface ShippingAddress {
    details: string
    phone: string
    city: string
}
