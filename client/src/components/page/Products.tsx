import Skeleton from "../ui/utils/Skeleton";
import CreateProductModel from "../ui/product/CreateProductModel";
import { Plus } from "phosphor-react";
import { useState } from "react";
import { useGetProductsQuery } from "../../lib/ProductsApi";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type SortingState } from "@tanstack/react-table";
import { columns } from "../../lib/tables/products"

export default function products() {
	const [isOpen, setIsOpen] = useState(false);
	const [globalFilter, setGlobalFilter] = useState("");
	const [sorting, setSorting] = useState<SortingState>([])
	const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

	const { data, isLoading, isError } = useGetProductsQuery()

	const products = data?.data ?? [];

	const table = useReactTable({
		data: products,
		columns,
		state: {
			globalFilter,
			sorting,
			pagination,
		},
		onGlobalFilterChange: setGlobalFilter,
		onSortingChange: setSorting,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	return (
		<div className="w-full p-8">
			<h1 className="text-sm pb-8 font-bold">Products</h1>
			<div className="w-full">
				<div className="flex justify-between pb-4 w-full">
					<div>
						<input
							type="text"
							value={globalFilter}
							onChange={e => setGlobalFilter(e.target.value)}
							placeholder="Search Products"
							className="p-2 px-3 text-sm border border-gray-300 rounded-lg"
						/>
					</div>
					<div>
						<button
							className="bg-pink-400 p-2 px-4 rounded-lg text-sm flex items-center gap-2 text-white font-bold hover:cursor-pointer"
							onClick={() => setIsOpen(!isOpen)}
						>
							<Plus /> Add Products
						</button>
					</div>
				</div>

				{isLoading && <Skeleton width="100vw" height="500px" />}

				{isError && <p>Failed to load products</p>}

				{!isLoading && !isError && (
					<>
						<div>
							<table className="w-full border-separate border-spacing-0">
								<thead>
									{table.getHeaderGroups().map(group => (
										<tr
											key={group.id}
											className="text-sm text-left"
										>
											{group.headers.map(header => (
												<th
													key={header.id}
													className="p-3 bg-pink-100"
												>
													{header.isPlaceholder ? null : (
														<div className={`flex items-center gap-2 ${header.column.getCanSort() ? "cursor-pointer select-none" : ""}`}
															onClick={header.column.getToggleSortingHandler()}>
															{flexRender(header.column.columnDef.header, header.getContext())}
															{{ asc: "^", desc: "!" }[header.column.getIsSorted() as string] ?? null}
														</div>
													)}
												</th>
											))}
										</tr>
									))}
								</thead>
								<tbody>
									{table.getRowModel().rows.map(row => (
										<tr
											key={row.id}
											className="text-xs"
										>
											{row.getVisibleCells().map(cell => (
												<td
													key={cell.id}
													className="p-3 border-b border-gray-200"
												>
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</td>
											))}
										</tr>
									))}

									{table.getRowModel().rows.length === 0 && (
										<tr>
											<td
												colSpan={columns.length}
												className="p-5text-center text-gray-500"
											>
												No customers found.
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
						<div className="flex items-center justify-between p-3 shrink-0 mt-4">
							<div className="flex items-center gap-2 text-sm">
								<span>Rows per page:</span>

								<select
									value={pagination.pageSize}
									onChange={e =>
										table.setPageSize(Number(e.target.value))
									}
									className="border border-gray-200 rounded-md p-1 outline-none"
								>
									{[5, 10, 20, 50].map(size => (
										<option key={size} value={size}>
											{size}
										</option>
									))}
								</select>
							</div>
							<div className="flex items-center gap-2">

								<button
									onClick={() => table.setPageIndex(0)}
									disabled={!table.getCanPreviousPage()}
									className="px-2 py-1 border border-neutral-700 text-sm rounded-md disabled:opacity-50"
								>
									{"<<"}
								</button>

								<button
									onClick={() => table.previousPage()}
									disabled={!table.getCanPreviousPage()}
									className="px-2.5 py-1 border border-neutral-700 text-sm rounded-md disabled:opacity-50"
								>
									&lt;
								</button>

								<span className="text-xs text-gray-600">
									Page{" "} {table.getState().pagination.pageIndex + 1} {" "}of{" "} {Math.max(table.getPageCount(), 1)}
								</span>

								<button
									onClick={() => table.nextPage()}
									disabled={!table.getCanNextPage()}
									className="px-2.5 py-1 border border-neutral-700 text-sm rounded-md disabled:opacity-50"
								>
									&gt;
								</button>

								<button
									onClick={() =>
										table.setPageIndex(table.getPageCount() - 1)
									}
									disabled={!table.getCanNextPage()}
									className="px-2 py-1 border border-neutral-700 text-sm rounded-md disabled:opacity-50"
								>
									{">>"}
								</button>
							</div>
						</div>
					</>
				)}
			</div >

			{isOpen && (
				<div className="flex bg-black/20 backdrop-blur-xs absolute z-50 inset-0 justify-center items-center">
					<CreateProductModel
						onClose={() => setIsOpen(!isOpen)}
					/>
				</div>
			)}
		</div >
	)
}