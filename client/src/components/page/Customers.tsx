import CreateCustomerModel from "../ui/customer/createCustomerModal";
import { useGetCustomerQuery } from "../../lib/CustomersApi";
import { useState } from "react";
import { Minus, Plus } from "phosphor-react";



export default function Customers() {
    const [isOpen, setIsOpen] = useState(false)

    const { data, isLoading, isError } = useGetCustomerQuery();

    const customers = data?.data ?? [];

    return (
        <div className="flex justify-center items-center w-screen p-10">


            <div className="h-135">
                <div className="flex justify-between bg-black text-white rounded-lg p-2">
                    <div>
                        Customers
                    </div>
                    <button
                        className="text-black bg-white p-1 rounded-full"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {
                            isOpen ? (
                                <Minus weight="bold" />
                            ) : (<Plus weight="bold" />)
                        }
                    </button>
                </div>
                <div className="flex flex-col gap-2 p-3.5 overflow-y-scroll h-110">
                    {isLoading && <p>Loading customers...</p>}
                    {isError && <p>Failed to load customers.</p>}
                    {customers.map((customer) => (
                        <div
                            key={customer.id}
                            className="p-2 border-black border rounded-lg bg-white/80"
                        >
                            {customer.name}
                            <br />
                            E-mail: {customer.email}
                            <br />
                            Phone: {customer.countryCode} {customer.phone}
                            <br />
                            Address: {customer.address}
                        </div>
                    ))}
                </div>
            </div>

            {
                isOpen && (
                    <div className="flex bg-black/20 absolute z-50 inset-0 justify-center items-center">
                        <CreateCustomerModel
                            onClose={() => setIsOpen(!isOpen)}
                        />
                    </div>
                )
            }
        </div>
    )
}