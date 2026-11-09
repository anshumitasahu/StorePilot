import type { ColumnDef } from "@tanstack/react-table";
import type { OrderResponse } from "../../types/types";

export const columns: ColumnDef<OrderResponse>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "customer.name",
        header: "Customer Name",
        cell: ({ row }) => row.original.customer.name,
    },
    {
        accessorKey: "orderItems",
        header: "Products",
        cell: ({ row }) =>
            row.original.orderItems
                .map((item) => item.product.name)
                .join(", "),
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) =>
            new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
        accessorKey: "isActive",
        header: "Status",
        cell: ({ row }) =>
            row.original.isActive ? "Active" : "Inactive",
    },
];