import { NavLink } from "react-router-dom"

export default function NavBar() {
    return (
        <div className="flex flex-col gap-20 bg-black/90 text-white p-10 h-full">
            <div className="font-lobster text-xl">
                <NavLink to="/home">
                    The VoKal Grocer
                </NavLink>
            </div>
            <div>
                <ul className="flex flex-col gap-5">
                    <li className="hover:cursor-pointer hover:border-b-2 border-neutral-500 duration-300 ease-in-out hover:font-semibold">
                        <NavLink to="/products">
                            Products
                        </NavLink>
                    </li>
                    <li className="hover:cursor-pointer hover:border-b-2 border-neutral-500 duration-300 ease-in-out hover:font-semibold">
                        <NavLink to="/customers">
                            Customer
                        </NavLink>
                    </li>
                    <li className="hover:cursor-pointer border border-white/90 px-2 py-1 rounded-full hover:-translate-y-0.5 duration-300 ease-in-out">
                        <NavLink to="/">
                            Orders
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}