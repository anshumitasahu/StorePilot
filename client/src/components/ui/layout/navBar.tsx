import { Package, Storefront, Users } from "phosphor-react"
import { NavLink } from "react-router-dom"

export default function NavBar() {
    return (
        <div className="flex flex-col bg-pink-50/90  h-full p-8 w-75">
            <div className="text-xl">
                <NavLink to="/home">
                    <div className="flex gap-2 items-center">
                        <div className="bg-pink-500 text-white text-sm font-bold w-6 h-6 rounded-lg flex justify-center items-center">
                            S
                        </div>
                        <div className="text-sm text-pink-500 font-bold">
                            ShopPilot
                        </div>
                    </div>

                </NavLink>
            </div>
            <div className="w-full pt-8">
                <ul className="flex flex-col gap-4">
                    <li className="bg-pink-200 p-2 rounded-lg">
                        <NavLink to="/products">
                            <div className="flex gap-2 items-center text-sm">
                                <Storefront size={14} />
                                Products
                            </div>
                        </NavLink>
                    </li>
                    <li className="">
                        <NavLink to="/customers">
                            <div className="flex gap-2 text-sm">
                                <Users size={14} />
                                Customer
                            </div>
                        </NavLink>
                    </li>
                    <li className="">
                        <NavLink to="/">
                            <div className="flex gap-2 text-sm">
                                <Package size={14} />
                                Orders
                            </div>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}