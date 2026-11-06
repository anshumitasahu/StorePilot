import CreateCustomerModel from "../ui/customer/createCustomerModal";
import { useGetCustomerQuery } from "../../lib/CustomersApi";



export default function Customers() {

    const { data, isLoading, isError } = useGetCustomerQuery();

    const customers = data?.data ?? [];

    return (
        <div className="grid grid-cols-[1fr_2fr] gap-3 justify-center items-center">
            <CreateCustomerModel />

            <div className="h-135">
                <div className="bg-black text-white rounded-lg p-2">
                    Customers
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
        </div>
    )
}