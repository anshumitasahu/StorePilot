import CreateCustomerModel from "../ui/customer/createCustomerModal";
import { useGetCustomerQuery } from "../../lib/CustomersApi";
import { useState } from "react";
import { Minus, Plus } from "phosphor-react";
import Skeleton from "../ui/utils/Skeleton";
import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable, type SortingState } from "@tanstack/react-table";
import { columns } from "../../lib/tables/customer";

export default function Customers() {
    const [isOpen, setIsOpen] = useState(false)
    const [globalFilter, setGlobalFilter] = useState("");
    const [sorting, setSorting] = useState<SortingState>([]);

    const { data, isLoading, isError } = useGetCustomerQuery();

    const customers = data?.data ?? [];

    const table = useReactTable({
        data: customers,
        columns: columns,
        state: {
            globalFilter,
            sorting
        },
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel()
    })

    return (
        <div className="flex justify-center items-center w-fit p-10 rounded-lg">

            <div className="h-160 w-[1131.51px] bg-white rounded-lg flex flex-col">
                <div className="flex justify-between shrink-0 p-2">
                    <div>
                        <input
                            type="text"
                            value={globalFilter ?? ''}
                            onChange={e => setGlobalFilter(e.target.value)}
                            placeholder="Search Customers"
                        />
                    </div>
                    <button
                        className="text-black bg-white p-1 rounded-full"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {
                            isOpen ? (
                                <Minus weight="bold" />
                            ) : (<Plus weight="bold" />)
                        }
                    </button>
                </div>

                {isLoading && <Skeleton width="100%" height="500px" />}

                {isError && <p>Failed to load customers.</p>}

                <div className="flex-1 min-h-0 overflow-auto rounded-lg shadow-md">
                    <table className="w-full border-separate border-spacing-0">
                        <thead>
                            {table.getHeaderGroups().map(group => (
                                <tr key={group.id} className="first:rounded-bl-lg last:rounded-br-lg text-sm text-left">
                                    {group.headers.map(header => (
                                        <th
                                            key={header.id}
                                            className="p-3 bg-gray-100 first:rounded-bl-lg last:rounded-br-lg"
                                        >
                                            {header.isPlaceholder ? null : (
                                                <div
                                                    className={`flex items-center gap-2 ${header.column.getCanSort() ? "cursor-pointer select-none" : ""}`}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                >
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    {{
                                                        asc: '↑',
                                                        desc: '↓',
                                                    }[header.column.getIsSorted() as string] ?? null}
                                                </div>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map(row => (
                                <tr key={row.id} className="text-sm">
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="p-3 border-b border-gray-200">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {
                isOpen && (
                    <div className="flex bg-black/20 absolute z-50 inset-0 justify-center items-center">
                        <CreateCustomerModel
                            onClose={() => setIsOpen(!isOpen)}
                        />
                    </div>
                )
            }
        </div>
    )
}