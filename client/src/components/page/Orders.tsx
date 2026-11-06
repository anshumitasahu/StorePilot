import { User, X } from "phosphor-react";
import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:3000";


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
    const [products, setProducts] = useState<Products[]>([])
    const [customers, setCustomers] = useState<Customers[]>([])
    const [orders, setOrders] = useState<Orders[]>([])

    const [productId, setProductId] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [quantity, setQuantity] = useState("1");
    const [addedItems, setAddedItems] = useState<{ product: number, quantity: number }[]>([]);

    // const findCustomer = customers.find(customer => customer.id === Number(customerId))
    const findProducts = products.find(product => product.id === Number(productId))
    const price = (findProducts ? findProducts.price * Number(quantity) : 0)

    const getProducts = async () => {
        try {
            const res = await axios.get(
                `${API}/api/products`
            );

            setProducts(res.data.data);
        } catch (error) {
            console.log("getProducts:", error)
        }
    }

    const getCustomers = async () => {
        try {
            const res = await axios.get(
                `${API}/api/customers`
            );

            setCustomers(res.data.data)
        } catch (error) {
            console.log("getCustomers:", error);
        }
    }

    const getOrders = async () => {
        try {
            const res = await axios.get(
                `${API}/api/orders`
            );

            setOrders(res.data.data)
        } catch (error) {
            console.log("getOrders:", error);
        }
    }

    const createOrders = async () => {
        try {
            if (!customerId) {
                alert("Select a customer");
                return;
            }

            const allItems = [
                ...addedItems, ...(productId ?
                    [{
                        product: Number(productId),
                        quantity: Number(quantity)
                    }] : [])
            ];
            await axios.post(`${API}/api/orders`, {
                customerId: Number(customerId),
                items: allItems.map(item => ({
                    productId: item.product,
                    quantity: item.quantity
                }))
            });

            setCustomerId("");
            setProductId("");
            setQuantity("1");
            setAddedItems([]);


            getOrders();

        } catch (error) {
            console.log("createOrders:", error);
        }
    };

    useEffect(() => {
        getProducts();
        getCustomers();
        getOrders();
    }, [])

    return (
        <div className="grid grid-cols-[1fr_2fr] gap-3 border border-black/80 rounded-lg w-screen justify-center items-center h-screen overfloew-hidden px-5">
            <div className="border border-black/70 p-8 rounded-lg flex flex-col justify-center items-center gap-5 h-fit bg-white/80">
                <div className="flex flex-col justify-center gap-5 w-full">
                    <div>
                        <label className="text-sm text-neutral-800">Customer's Name </label>
                        <select
                            id="customers_name"
                            name="customersName"
                            className="border border-black/30 outline-0 rounded-lg px-1 py-1 w-full"
                            value={customerId}
                            onChange={(e) => setCustomerId(e.target.value)}
                        >
                            <option value="">
                                Select Customer
                            </option>
                            {customers.map((customer) => (
                                <option
                                    key={customer.id}
                                    value={customer.id}
                                >
                                    {customer.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col justify-center gap-5 border border-neutral-300 p-3 rounded-lg bg-neutral-50">
                        <div>
                            <label className="text-sm text-neutral-800"> Product </label>
                            <select
                                id="products"
                                name="products"
                                className="border border-black/30 outline-0 rounded-lg px-1 py-1 w-full"
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            >
                                <option value="">
                                    Select Product
                                </option>
                                {products.map((product) => (
                                    <option
                                        key={product.id}
                                        value={product.id}
                                    >
                                        {product.name}: ₹{product.price}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <div className="text-sm text-neutral-800">
                                Product Quantity
                            </div>
                            <input
                                type="number"
                                className="border border-black/30 outline-0 rounded-lg px-1 py-1 w-full"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-full max-h-30 overflow-scroll">
                    {addedItems.map((item, index) => {
                        const product = products.find(
                            product => product.id === item.product
                        );

                        return (
                            <div
                                key={index}
                                className="border border-black/20 p-2 rounded-lg flex justify-between"
                            >
                                {product?.name} ({item.quantity})
                                :
                                ₹{(product?.price || 0) * item.quantity}

                                <button
                                    onClick={() => {
                                        setAddedItems(prev =>
                                            prev.filter((_, items) => items !== index)
                                        );
                                    }}
                                    className="hover:text-red-500 hover:bg-neutral-100 hover:rounded-full p-2 hover:curssor-pointer"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center">
                    <span className="text-sm text-neutral-800">Price:</span> ₹{price}
                </div>

                <div className="flex gap-2">
                    <button
                        className="text-white bg-black w-fit px-2 py-1 rounded-lg hover:cursor-pointer"
                        onClick={() => {
                            setAddedItems(prev => [
                                ...prev,
                                {
                                    product: Number(productId),
                                    quantity: Number(quantity)
                                }
                            ]);

                            setProductId("");
                            setQuantity("1");
                        }}

                    >
                        Add More Items
                    </button>
                    <div>
                        <button
                            className="text-white bg-black w-fit px-2 py-1 rounded-lg hover:cursor-pointer"
                            onClick={createOrders}
                        >
                            Add Order
                        </button>
                    </div>
                </div>
            </div>
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