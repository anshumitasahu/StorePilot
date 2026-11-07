import Skeleton from "../ui/utils/Skeleton";
import CreateProductModel from "../ui/product/CreateProductModel";
import { Minus, Plus } from "phosphor-react";
import { useState } from "react";
import { useGetProductsQuery } from "../../lib/ProductsApi";



export default function products() {
	const [isOpen, setIsOpen] = useState(false)

	const { data, isLoading } = useGetProductsQuery()

	return (
		<div className="flex justify-center items-center w-full p-10">

			{/* <CreateProductModel /> */}

			<div className="w-full">
				<div className="flex justify-between items-center bg-black text-white rounded-lg p-2 mb-2">
					<div>
						Products
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
				<div className="h-150 overflow-scroll">
					{isLoading && <Skeleton width="100vw" height="500px" />}
					<table className="border border-neutral-600 w-full bg-white/80 rounded-lg border-separate border-spacing-0 overflow-hidden" >
						<thead>
							<tr className="border-b">
								<th className="border-r border-b border-neutral-600">ID</th>
								<th className="border-r border-b border-neutral-600">Product Name</th>
								<th className="border-r border-b border-neutral-600">Price</th>
								<th className="border-r border-b border-neutral-600">CreatedAt</th>
								<th className="border-r border-b border-neutral-600">UpdatedAt</th>
								<th className="border-b border-neutral-600">isActive</th>
							</tr>
						</thead>
						<tbody>
							{data?.data.map((product) => (
								<tr key={product.id}>
									<td className="border-r border-b p-2 border-neutral-600">{product.id}</td>
									<td className="border-r border-b p-2 border-neutral-600">{product.name}</td>
									<td className="border-r border-b p-2 border-neutral-600">₹{product.price}</td>
									<td className="border-r border-b p-2 border-neutral-600">{new Date(product.createdAt).toLocaleDateString()}</td>
									<td className="border-r border-b p-2 border-neutral-600">{new Date(product.updatedAt).toLocaleDateString()}</td>
									<td className="border-b p-2 border-neutral-600">{product.isActive ? "True" : "False"}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{
				isOpen && (
					<div className="flex bg-black/20 absolute z-50 inset-0 justify-center items-center">
						<CreateProductModel
							onClose={() => setIsOpen(!isOpen)}
						/>
					</div>
				)
			}
		</div>
	)
}