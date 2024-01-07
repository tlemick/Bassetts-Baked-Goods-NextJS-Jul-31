'use client';

import { ShoppingCart, Vegan, WheatOff } from 'lucide-react';

import Currency from '@/components/ui/currency';
import Button from './ui/button';
import { Product, Size } from '@/types';
import useCart from '@/hooks/use-cart';
import { useState } from 'react';

interface InfoProps {
	data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
	const cart = useCart();
	const [selectedSize, setSelectedSize] = useState<Size | null>(
		data?.sizes && data.sizes.length > 0 ? data.sizes[0] : null,
	);

	const [quantity, setQuantity] = useState<number>(1);

	const onAddToCart = () => {
		const priceToAdd = selectedSize !== null ? selectedSize.price : data.price;
		const totalPrice = priceToAdd * quantity;
		data.selectedSize = selectedSize;
		cart.addItem({ ...data, price: totalPrice, quantity });
	};

	const handleSizeSelection = (size: Size | null) => {
		if (size !== null) {
			setSelectedSize(size);
		}
	};

	const incrementQuantity = () => {
		setQuantity((prevQuantity) => prevQuantity + 1);
	};

	const decrementQuantity = () => {
		if (quantity > 1) {
			setQuantity((prevQuantity) => prevQuantity - 1);
		}
	};

	return (
		<div>
			<h1 className="text-[48px] font-bold text-gray-900">{data.name}</h1>
			<div className="mt-9 flex items-end justify-between">
				<p className="text-lg text-gray-900">
					<Currency
						value={selectedSize !== null ? selectedSize.price : data.price}
					/>
				</p>
			</div>
			<hr className="my-4" />

			<div className="flex flex-col">
				<div>
					<p className="text-black">{data?.description}</p>
				</div>
				<div>
					<div className="flex gap-x-4 mt-4">
						{data?.canBeVegan && (
							<div className="flex gap-x-2 items-center">
								<Vegan size={16} className="text-gray-600" />
								<p className="text-sm text-gray-500">Vegan</p>
							</div>
						)}
						{data?.canBeGF && (
							<div className="flex gap-x-2 items-center">
								<WheatOff size={16} className="text-gray-600" />
								<p className="text-sm text-gray-500">Gluten free</p>
							</div>
						)}
					</div>
				</div>
				<hr className="my-4" />

				<div className="flex flex-col gap-y-4">
					<h3 className="font-semibold text-black">Size Options:</h3>
					{data?.sizes && (
						<div className="gap-4 flex flex-row min-w-full">
							{data.sizes
								.sort((a, b) => a.price - b.price)
								.map((size, index) => (
									<div
										className={`relative border ${
											selectedSize?.id === size.id
												? 'border-rose-300 bg-rose-50'
												: 'border-gray-300'
										} flex flex-col items-center py-4 flex-grow hover:border-rose-300 rounded-lg`}
										key={index}
										onClick={() => handleSizeSelection(size)}
									>
										<div
											className={`absolute top-2 left-2 w-4 h-4 rounded-full bg-rose-500 ${
												selectedSize?.id === size.id ? 'visible' : 'hidden'
											}`}
										/>
										<div>{size.name}</div>
										{size.name !== size.dimensions && (
											<div>{size.dimensions}</div>
										)}
										{/* <Currency value={size.price} /> */}
									</div>
								))}
						</div>
					)}
				</div>
			</div>
			<h3 className="mt-8 font-semibold text-black">Quantity:</h3>
			<div className="mt-4 flex flex-row items-center gap-4">
				<div className="flex border border-black p-1 rounded-full gap-x-4">
					<Button variant="increment" onClick={decrementQuantity}>
						-
					</Button>
					<span className="w-[18px] inline-block text-center">{quantity}</span>
					<Button variant="increment" onClick={incrementQuantity}>
						+
					</Button>
				</div>
				<div className="flex items-center gap-x-3">
					<Button
						variant="primary"
						onClick={onAddToCart}
						className="flex items-center gap-x-2"
					>
						Add To Cart
						<ShoppingCart size={20} />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Info;
