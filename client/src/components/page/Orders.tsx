import { Plus, User } from "phosphor-react";
import CreateOrdersModal from "../ui/orders/CreateOrderModal";
import { useGetOrderQuery } from "../../lib/OrderApi";
import { useState } from "react";
import Skeleton from "../ui/utils/Skeleton";

export default function Orders() {
    const [isOpen, setIsOpen] = useState(false);
    const { data, isLoading, isError } = useGetOrderQuery()
    const orders = data?.data ?? [];

    return (
        <div className="w-full p-8">
            <h1 className="text-sm pb-8 font-bold">Orders</h1>
            <div className="flex justify-between pb-4 w-full">
                <div>order</div>
                <div>
                    <button
                        className="bg-pink-400 p-2 px-4 rounded-lg flex text-sm items-center gap-2 text-white font-bold hover:cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <Plus /> Add Customer
                    </button>
                </div>
            </div>

            {isLoading && <Skeleton width="100vw" height="500px" />}

            {isError && <p>Failed to load products</p>}

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
            {isOpen && (
                <div className="flex bg-black/20 backdrop-blur-xs absolute z-50 inset-0 justify-center items-center">
                    <CreateOrdersModal
                    />
                </div>
            )}
        </div >
    )
}