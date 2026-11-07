import type { ColumnDef } from "@tanstack/react-table";
import type { CreateCustomerProps } from "../../types/types";

export const columns: ColumnDef<CreateCustomerProps>[] = [
    {
        accessorKey: "id",
        header: "ID"
    },
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "email",
        header: "Email"
    },
    {
        id: "phone",
        accessorFn: (row) => `${row.countryCode}${row.phone}`,
        header: "Phone"
    },
    {
        accessorKey: "address",
        header: "Address"
    }
];