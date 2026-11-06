import type { CreateProductProps, Response, ProductsQueryResponse, UseCreateProductProps } from "../types/types";
import axios from "axios";
import { API_ROUTES } from "./api";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useGetProductsQuery = () => {
    return useQuery({
        queryKey: ["get-product"],
        queryFn: async () => {
            const res = await axios.get<ProductsQueryResponse>(API_ROUTES.PRODUCT.GET);
            return res.data;
        }
    });
}

export const createProducts = ({ setName, setPrice, onClose }: UseCreateProductProps) => {
    return useMutation({
        mutationFn: async (data: CreateProductProps) => {
            const res = await axios.post<Response>(API_ROUTES.PRODUCT.CREATE, data);
            return res.data;
        },
        onSuccess: (data) => {
            alert(data.message);

            setName("");
            setPrice("");

            useGetProductsQuery();

            onClose();
        }
    })
}