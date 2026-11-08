import { useState } from "react";
import { createCustomers } from "../../../lib/CustomersApi";
import { X } from "phosphor-react";

interface CreateCustomerProps {
    onClose: () => void;
}

export default function CreateCustomerModel({ onClose }: CreateCustomerProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [countryCode, setCountryCode] = useState("+91");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const createCustomerMutation = createCustomers({ setName, setEmail, setCountryCode, setPhone, setAddress, onClose });

    const handelCreateCustomer = () => {
        createCustomerMutation.mutate({
            name,
            email,
            countryCode,
            phone,
            address
        })
    }

    return (
        <div>
            <div className="p-6 rounded-2xl flex flex-col items-center justify-center gap-3 bg-white h-fit min-w-[500px] relative">
                <div
                    className="flex justify-between w-full items-center"
                    onClick={onClose}
                >
                    <h1 className="text-sm font-bold">Add Customer</h1>
                    <button className="p-1 bg-pink-200 rounded">
                        <X weight="bold" className="text-pink-500 text-sm" />
                    </button>
                </div>
                <div className="flex flex-col gap-4 w-full pt-4 border-t border-gray-200">
                    <div className="flex flex-col gap-1">
                        <div className="text-xs text-neutral-700">
                            Customer's Name
                        </div>
                        <input
                            type="text"
                            placeholder="Jhon Doe"
                            className="border border-gray-300 outline-0 rounded-lg p-1.5 px-3 w-full text-sm"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="text-xs text-neutral-700">
                            Customer's E-mail
                        </div>
                        <input
                            type="text"
                            placeholder="jhonDoe@gmail.com"
                            className="border border-gray-300 outline-0 rounded-lg p-1.5 px-3 w-full text-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-4 grid-cols-3">
                        <div className="flex flex-col gap-1 col-span-1">
                            <label className="text-xs text-neutral-700">Country's Code </label>
                            <select
                                id="countryCode" name="countryCode"
                                className="border border-gray-300 outline-0 rounded-lg p-1.5 px-3 w-full text-sm"
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
                        <div className="flex flex-col gap-1 col-span-2">
                            <div className="text-xs text-neutral-700">
                                Customer's Phone
                            </div>
                            <input
                                type="text"
                                placeholder="90xxxxxxx1"
                                className="border border-gray-300 outline-0 rounded-lg p-1.5 px-3 w-full text-sm"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="text-xs text-neutral-700">
                            Customer's Address
                        </div>
                        <textarea
                            placeholder="Conught Place,ND"
                            className="border border-gray-300 outline-0 rounded-lg p-1.5 px-3 w-full text-sm"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-4 w-full flex justify-end">
                    <button
                        className="text-white bg-pink-500 w-fit px-4 py-2 rounded-xl hover:cursor-pointer text-xs font-bold"
                        onClick={handelCreateCustomer}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    )
}