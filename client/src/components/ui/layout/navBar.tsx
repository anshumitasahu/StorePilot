import { Package, Storefront, Users } from "phosphor-react"
import { NavLink } from "react-router-dom"

export default function NavBar() {
    return (
        <div className="flex flex-col gap-20 bg-pink-50/90  h-full p-8 w-65">
            <div className="font-lobster text-xl">
                <NavLink to="/home">
                    <div>
                        <img src="./Voice Store Awning Icon.png" alt="" />
                        <div>
                            The VoKal Grocers
                        </div>
                    </div>

                </NavLink>
            </div>
            <div>
                <ul className="flex flex-col gap-5 px-4 py-5">
                    <li className="hover:cursor-pointer hover:bg-rose-200 border-neutral-500 duration-300 ease-in-out hover:font-semibold px-2 py-1 text-center rounded-lg">
                        <NavLink to="/products">
                            <div className="flex items-center justify-center gap-2 text-rose-500">
                                <Storefront size={20} />
                                <div>
                                    Products
                                </div>
                            </div>
                        </NavLink>
                    </li>
                    <li className="hover:cursor-pointer hover:bg-rose-200 border-neutral-500 duration-300 ease-in-out hover:font-semibold px-2 py-1 text-center rounded-lg text-rose-500">
                        <NavLink to="/customers">
                            <div className="flex items-center justify-center gap-2">
                                <Users size={20} />
                                <div>
                                    Customer
                                </div>
                            </div>
                        </NavLink>
                    </li>
                    <li className="hover:cursor-pointer border border-rose-500 px-2 py-1 rounded-lg hover:-translate-y-0.5 duration-300 ease-in-out  text-rose-500">
                        <NavLink to="/">
                            <div className="flex items-center justify-center gap-2">
                                <Package size={20} />
                                <div>
                                    Orders
                                </div>
                            </div>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}