import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:3000";

interface Customers {
    id: number,
    name: string,
    email: string,
    countryCode: string,
    phone: string,
    address: string
}

export default function Customers() {
    const [customers, setCustomers] = useState<Customers[]>([])

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

    useEffect(() => {
        getCustomers();
    }, [])

    return (
        <div className="grid grid-cols-[1fr_2fr] gap-3 justify-center items-center">

            <div className="h-135">
                <div className="bg-black text-white rounded-lg p-2">
                    Customers
                </div>
                <div className="flex flex-col gap-2 p-3.5 overflow-y-scroll h-110">
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