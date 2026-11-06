import axios from "axios";
import { useState } from "react";
import { API_ROUTES } from "../../../lib/api";

interface Customers {
    id: number,
    name: string,
    email: string,
    countryCode: string,
    phone: string,
    address: string
}

export default function CreateCustomerModel() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [countryCode, setCountryCode] = useState("+91");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [customers, setCustomers] = useState<Customers[]>([])


    const getCustomers = async () => {
        try {
            const res = await axios.get(
                `${API_ROUTES}/api/customers`
            );

            setCustomers(res.data.data)
        } catch (error) {
            console.log("getCustomers:", error);
        }
    }

    const createCustomers = async () => {
        try {
            await axios.post(
                `${API_ROUTES}/api/customers`, {
                name,
                email,
                countryCode,
                phone,
                address
            });

            setName("");
            setEmail("");
            setCountryCode("");
            setPhone("");
            setAddress("");

            getCustomers();
        } catch (error) {
            console.log("createCustomers:", error)
        }
    }

    return (
        <div>
            <div className="border border-black/70 p-8 rounded-lg flex flex-col items-center justify-center gap-3 bg-white/80 h-fit min-w-md">
                <div className="flex flex-col gap-3 w-full">
                    <div>
                        <div className="text-sm text-neutral-800">
                            Customer's Name
                        </div>
                        <input
                            type="text"
                            placeholder="Jhon Doe"
                            className="border border-black/30 outline-0 rounded-lg px-1 py-1 w-full"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="text-sm text-neutral-800">
                            Customer's E-mail
                        </div>
                        <input
                            type="text"
                            placeholder="jhonDoe@gmail.com"
                            className="border border-black/30 outline-0 rounded-lg px-1 py-1 w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-sm text-neutral-800">Country's Code </label>
                        <select
                            id="countryCode" name="countryCode"
                            className="border border-black/30 outline-0 rounded-lg px-1 py-1 w-full"
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                        >
                            <option value="IN"> +91 </option>
                            <option value="CA"> +1 </option>
                            <option value="AU"> +61 </option>
                            <option value="FR"> +33 </option>
                            <option value="DE"> +49 </option>
                            <option value="JP"> +81 </option>
                            <option value="MX"> +52 </option>
                            <option value="GB"> +44 </option>
                            <option value="US"> +1 </option>
                        </select>
                    </div>
                    <div>
                        <div className="text-sm text-neutral-800">
                            Customer's Phone
                        </div>
                        <input
                            type="text"
                            placeholder="90xxxxxxx1"
                            className="border border-black/30 w-full outline-0 rounded-lg px-1 py-1"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <div>
                        <div className="text-sm text-neutral-800">
                            Customer's Address
                        </div>
                        <input
                            type="text"
                            placeholder="Conught Place,ND"
                            className="border border-black/30 w-full outline-0 rounded-lg px-1 py-1"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <button
                        className="text-white bg-black w-fit px-2 py-1 rounded-lg hover:cursor-pointer"
                        onClick={createCustomers}
                    >
                        Add Customers
                    </button>
                </div>
            </div>
        </div>
    )
}