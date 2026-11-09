import { User } from "phosphor-react";
import { useState } from "react";
import CreateOrdersModal from "../ui/orders/CreateOrderModal";
import { useGetOrderQuery } from "../../lib/OrderApi";


interface Products {
    id: number,
    name: string,
    price: number
}

interface Customers {
    id: number,
    name: string,
    email: string,
    countryCode: string,
    phone: string,
    address: string
}

interface Orders {
    id: number,
    customer: Customers,
    orderItems: {
        id: number,
        quantity: number,
        product: Products
    }[]
}

export default function Orders() {
    const { data, isLoading, isError } = useGetOrderQuery()
    const orders = data?.data ?? [];


    // const findCustomer = customers.find(customer => customer.id === Number(customerId))

    return (
        <div className="grid grid-cols-[1fr_2fr] gap-3 border border-black/80 rounded-lg w-screen justify-center items-center h-screen overfloew-hidden px-5">
            <CreateOrdersModal />

            <div className="flex flex-col gap-2 p-3 h-150">
                <div className="bg-black text-white px-2 py-1 rounded-lg w-full">
                    Recent Orders:
                </div>
                <div className="flex flex-col gap-2 p-3 overflow-y-scroll h-128">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="border border-black p-3 flex gap-10 rounded-md items-center justify-between bg-white/80"
                        >
                            <div className="w-full flex items-center gap-3">
                                <div className="bg-black text-white p-2 rounded-lg">
                                    <User weight="bold" />
                                </div>
                                <div className="w-full">
                                    <span className="text-sm text-neutral-600">Customer</span> <br /> <span className="font-semibold">{order.customer.name}</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 max-h-20 overflow-scroll border-r border-l border-r-neutral-500 border-l-neutral-500  w-full items-center">
                                {order.orderItems.map((orderItem) => (
                                    <div
                                        key={orderItem.id}
                                        className="border border-black/20 px-2 py-1 rounded-md w-fit text-center"
                                    >
                                        {orderItem.product.name}({orderItem.quantity}): ₹{orderItem.product.price}
                                    </div>
                                ))}
                            </div>

                            <div className="w-full text-center ">
                                <span className="bg-neutral-100 p-2 rounded-lg font-semibold">
                                    Total: ₹{order.orderItems.reduce((total, item) => total + (item.quantity * item.product.price), 0)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}