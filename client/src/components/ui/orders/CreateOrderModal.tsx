import { X } from "phosphor-react";
import { useCreateOrders } from "../../../lib/OrderApi"
import { useState } from "react";
import { useGetProductsQuery } from "../../../lib/ProductsApi";
import { useGetCustomerQuery } from "../../../lib/CustomersApi";


export default function CreateOrdersModal() {

    const [productId, setProductId] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [quantity, setQuantity] = useState("1");
    const [addedItems, setAddedItems] = useState<
        { product: number; quantity: number }[]
    >([]);

    const { data: productResponse } = useGetProductsQuery();
    const { data: customerResponse } = useGetCustomerQuery();

    const products = productResponse?.data ?? [];
    const customers = customerResponse?.data ?? [];

    const createOrdersMutation = useCreateOrders({ setProductId, setCustomerId, setQuantity, setAddedItems });

    const handleCreateOrder = () => {
        createOrdersMutation.mutate({
            customerId: Number(customerId),
            orderItems: addedItems.map((item) => ({
                productId: item.product,
                quantity: item.quantity
            }))
        });
    };


    const findProducts = products.find(product => product.id === Number(productId))
    const price = (findProducts ? findProducts.price * Number(quantity) : 0)

    return (
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
                        onClick={handleCreateOrder}
                    >
                        Add Order
                    </button>
                </div>
            </div>
        </div>
    )
}