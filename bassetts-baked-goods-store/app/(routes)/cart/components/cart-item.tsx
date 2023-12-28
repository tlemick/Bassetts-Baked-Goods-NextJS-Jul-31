'use client';

import Image from 'next/image';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';
import Button from '@/components/ui/button';

import IconButton from '@/components/ui/icon-button';
import Currency from '@/components/ui/currency';
import useCart from '@/hooks/use-cart';
import { Product } from '@/types';

interface CartItemProps {
	data: Product;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
	const cart = useCart();

	//increment should increase data.quantity + 1
	//decrement should decrease data.quantity - 1
	//decrement should call cart.removeItem if data.quantity = 0
	const incrementQuantity = () => {
		cart.updateItemQuantity(data.id, data.selectedSize, data.quantity + 1);
	};

	const decrementQuantity = () => {
		if (data.quantity > 1) {
			// Decrement data.quantity directly
			cart.updateItemQuantity(data.id, data.selectedSize, data.quantity - 1);
		} else {
			cart.removeItem(data.id, data.selectedSize);
		}
	};

	const onRemove = () => {
		cart.removeItem(data.id, data.selectedSize);
	};

	return (
		<div>
			<li className="flex py-6 border-b">
				<div className="flex w-full">
					<div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
						<Image
							fill
							src={data.images[0].url}
							alt={data.name}
							className="object-cover object-center"
						/>
					</div>
					<div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
						<div className="absolute z-10 right-0 top-0">
							<IconButton onClick={onRemove} icon={<X size={15} />} />
						</div>
						<div className="relative h-full pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
							<div className="flex flex-col h-full justify-between">
								<div>
									<p className="text-2xl font-semibold text-black">
										{data.name}
									</p>
									<p className="text-lg font-semibold text-black">
										{data.selectedSize?.name}
									</p>
									<Currency value={data.price} />
								</div>
								<div className="flex gap-x-4 mt-2 pb-4">
									<Button variant="increment" onClick={decrementQuantity}>
										-
									</Button>
									<span className="w-[18px] inline-block text-center">
										{data.quantity}
									</span>
									<Button variant="increment" onClick={incrementQuantity}>
										+
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</li>
		</div>
	);
};

export default CartItem;
