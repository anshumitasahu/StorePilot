import type { ColumnDef } from "@tanstack/react-table";
import type { CreateCustomerProps } from "../../types/types";

export const columns: ColumnDef<CreateCustomerProps>[] = [
    {
        accessorKey: "id",
        header: "ID",
        enableSorting: true
    },
    {
        accessorKey: "name",
        header: "Name",
        enableSorting: true
    },
    {
        accessorKey: "email",
        header: "Email",
        enableSorting: true
    },
    {
        id: "phone",
        accessorFn: (row) => `${row.countryCode}${row.phone}`,
        header: "Phone",
        enableSorting: true
    },
    {
        accessorKey: "address",
        header: "Address",
        enableSorting: true
    }
];