import { useState } from 'react';
import { createProducts } from '../../../lib/ProductsApi';
import { X } from 'phosphor-react';


interface CreateProductModelProps {
    onClose: () => void;
}

export default function CreateProductModel({ onClose }: CreateProductModelProps) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const createProductsMutation = createProducts({ setName, setPrice, onClose });

    const handelCreateProduct = () => {
        if (!name.trim() || !price) {
            alert("Please enter vaild name and price");
            return;
        };

        createProductsMutation.mutate({
            name,
            price: Number(price),
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true
        })
    };

    return (
        <div className="p-6 rounded-2xl flex flex-col items-center justify-center gap-3 bg-white h-fit min-w-125 relative">
            <div
                className="flex justify-between w-full items-center"
                onClick={onClose}
            >
                <h1 className="text-sm font-bold">Add Product</h1>
                <button className="p-1 bg-pink-200 rounded">
                    <X weight="bold" className="text-pink-500 text-sm" />
                </button>
            </div>

            <div className="flex flex-col gap-4 w-full pt-4 border-t border-gray-200">

                <div className="flex flex-col gap-1">
                    <div className="text-xs text-neutral-700">
                        Product Name
                    </div>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="name"
                        className="border border-gray-300 outline-0 rounded-lg p-1.5 px-3 w-full text-sm"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <div className="text-xs text-neutral-700">
                        Product Price
                    </div>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter Price"
                        className="border border-gray-300 outline-0 rounded-lg p-1.5 px-3 w-full text-sm"
                    />
                </div>

                <div className="mt-4 w-full flex justify-end">
                    <button
                        className="text-white bg-pink-500 w-fit px-4 py-2 rounded-xl hover:cursor-pointer text-xs font-bold"
                        onClick={handelCreateProduct}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    )
}