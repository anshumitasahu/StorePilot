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
            price: Number(price)
        })
    };

    return (
        <div
            className="border border-black/50 p-8 rounded-lg flex flex-col items-center justify-center gap-3 bg-white h-fit min-w-md relative"
        >

            <div
                className="absolute top-2 right-2 p-2 bg-red-400 text-white hover:bg-red-500 rounded-full"
                onClick={onClose}
            >
                <X weight="bold" />
            </div>

            <div className="flex flex-col gap-5 w-full">
                <div className="flex flex-col gap-3">
                    <div>
                        <div className="text-sm text-neutral-800">
                            Product Name
                        </div>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="name"
                            className="border border-black/30 outline-0 px-2 py-1 rounded-lg w-full"
                        />
                    </div>
                    <div>
                        <div className="text-sm text-neutral-800">
                            Product Price
                        </div>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Enter Price"
                            className="border border-black/30 outline-0 px-2 py-1 rounded-lg w-full"
                        />
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <button
                        className="text-white bg-black w-fit px-2 py-1 rounded-lg hover:cursor-pointer"
                        onClick={handelCreateProduct}
                        disabled={createProductsMutation.isPending}
                    >
                        {createProductsMutation.isPending ? "creating..." : "Add Products"}
                    </button>
                </div>
            </div>
        </div>
    )
}