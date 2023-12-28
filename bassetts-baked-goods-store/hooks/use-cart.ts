import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { Product, Size } from '@/types';
import toast from 'react-hot-toast';

interface CartStore {
	items: Product[];
	addItem: (data: Product) => void;
	removeItem: (id: string, size: Size) => void;
	removeAll: () => void;
	updateItemQuantity: (id: string, size: Size, quantity: number) => void;
}

const useCart = create(
	persist<CartStore>(
		(set, get) => ({
			items: [],
			addItem: (data: Product) => {
				const currentItems = get().items;
				const existingItem = currentItems.find(
					(item) =>
						item.id === data.id &&
						item.selectedSize?.id === data.selectedSize?.id,
				);

				if (existingItem) {
					existingItem.quantity += data.quantity;
					set({ items: currentItems });
					return toast('Item quantity updated.');
				}

				set({ items: [...get().items, data] });
				toast.success('Item added to cart.');
			},
			removeItem: (id: string, size: Size) => {
				set({
					items: [
						...get().items.filter(
							(item) => item.id !== id || item.selectedSize?.id !== size.id,
						),
					],
				});
				toast.success('Item removed from cart');
			},
			removeAll: () => set({ items: [] }),
			updateItemQuantity: (id: string, size: Size, quantity: number) => {
				const updatedItems = get().items.map((item) =>
					item.id === id && item.selectedSize?.id === size.id
						? { ...item, quantity }
						: item,
				);
				set({ items: updatedItems });
			},
		}),
		{
			name: 'cart-storage',
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export default useCart;
