import { Package, Storefront, Users } from "phosphor-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
    const [isActive, setIsActive] = useState("Orders");

    return (
        <div className="flex flex-col bg-pink-50/90 h-full p-8 w-75">
            <div className="text-xl">
                <NavLink to="/home">
                    <div className="flex gap-2 items-center">
                        <div className="bg-pink-500 text-white text-sm font-bold w-6 h-6 rounded-lg flex justify-center items-center">
                            S
                        </div>
                        <div className="text-sm text-pink-500 font-bold">ShopPilot</div>
                    </div>
                </NavLink>
            </div>
            <div className="w-full pt-8">
                <ul className="flex flex-col gap-4">

                    <li>
                        <NavLink to="/products">
                            <button
                                onClick={() => setIsActive("Products")}
                                className="p-2 rounded-lg w-full text-left"
                                style={{
                                    backgroundColor: isActive === "Products" ? "#fccee8" : "",
                                }}
                            >
                                <div className="flex gap-2 items-center text-sm">
                                    <Storefront size={14} /> Products
                                </div>
                            </button>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/customers">
                            <button
                                onClick={() => setIsActive("Customers")}
                                className="p-2 rounded-lg w-full text-left"
                                style={{
                                    backgroundColor: isActive === "Customers" ? "#fccee8" : "",
                                }}
                            >
                                <div className="flex gap-2 items-center text-sm">
                                    <Users size={14} /> Customers
                                </div>
                            </button>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/">
                            <button
                                onClick={() => setIsActive("Orders")}
                                className="p-2 rounded-lg w-full text-left"
                                style={{
                                    backgroundColor: isActive === "Orders" ? "#fccee8" : "",
                                }}
                            >
                                <div className="flex gap-2 items-center text-sm">
                                    <Package size={14} /> Orders
                                </div>
                            </button>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}
