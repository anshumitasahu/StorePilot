import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { CreateCustomerProps, CustomersQueryResponse, UseCreateCustomerProps } from "../types/types"
import { API_ROUTES } from "./api"

export const useGetCustomerQuery = () => {
    return useQuery({
        queryKey: ["get-customer"],
        queryFn: async () => {
            const res = await axios.get<CustomersQueryResponse>(API_ROUTES.CUSTOMER.GET);
            return res.data;
        }
    })
}

export const createCustomers = ({ setName, setEmail, setCountryCode, setPhone, setAddress, onClose }: UseCreateCustomerProps) => {
    return useMutation({
        mutationFn: async (data: CreateCustomerProps) => {
            const res = await axios.post<Response>(API_ROUTES.CUSTOMER.CREATE, data);

            return res.data;
        },
        onSuccess: () => {
            alert("Customer created successfully");


            setName("");
            setEmail("");
            setCountryCode("");
            setPhone("");
            setAddress("");

            useGetCustomerQuery();

            onClose();
        }
    })
}