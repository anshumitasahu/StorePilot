import type { ColumnDef } from "@tanstack/react-table";
import type { OrderResponse } from "../../types/types";

export const columns: ColumnDef<OrderResponse>[] = [
    {
        id: "serialNumber",
        header: "ID",
        enableSorting: false,
        cell: ({ row, table }) =>
            table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            row.index +
            1,
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
        id: "totalAmount",
        header: "Total Amount",
        accessorFn: (row) =>
            row.orderItems.reduce(
                (total, item) =>
                    total + item.quantity * item.product.price,
                0
            ),
        cell: ({ getValue }) =>
            `₹${(getValue<number>()).toLocaleString("en-IN")}`,
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