import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import type { CreateOrdersProps, OrdersQueryResponse, UseCreateOrderProps } from "../types/types"
import { API_ROUTES } from "./api"

export const useGetOrderQuery = () => {
    return useQuery({
        queryKey: ["get-order"],
        queryFn: async () => {
            const res = await axios.get<OrdersQueryResponse>(API_ROUTES.ORDER.GET);
            return res.data
        }
    })
}


export const useCreateOrders = ({
    setProductId,
    setCustomerId,
    setQuantity,
    setAddedItems
}: UseCreateOrderProps) => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateOrdersProps) => {
            console.log("Order payload:", data);

            const res = await axios.post(
                API_ROUTES.ORDER.CREATE,
                data
            );

            return res.data;
        },

        onSuccess: async () => {
            alert("Order created successfully");

            setProductId("");
            setCustomerId("");
            setQuantity("1");
            setAddedItems([]);

            await queryClient.invalidateQueries({
                queryKey: ["get-order"]
            });
        },

        onError: (error) => {
            if (axios.isAxiosError(error)) {
                console.log("API Error:", error.response?.data);
                console.log("Status:", error.response?.status);

                alert(
                    error.response?.data?.message ||
                    error.message
                );
            } else {
                console.log(error);
            }
        }
    });
};
