import type { ColumnDef } from "@tanstack/react-table";
import type { CreateCustomerProps } from "../../types/types";

const columns: ColumnDef<CreateCustomerProps>[] = [
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
        accessorKey: "code",
        header: "Country Code"
    },
    {
        accessorKey: "phone",
        header: "Phone"
    },
    {
        accessorKey: "address",
        header: "Address"
    }
];