"use client"

import Image from "next/image"
import { MouseEventHandler } from "react"
import { Expand, ShoppingCart, Vegan, WheatOff } from "lucide-react"
import { useRouter } from "next/navigation"

import Currency from "@/components/ui/currency"
import IconButton from "@/components/ui/icon-button"
import usePreviewModal from "@/hooks/use-preview-modal"
import useCart from "@/hooks/use-cart"
import { Product } from "@/types"

interface ProductCard {
    data: Product
}

const ProductCard: React.FC<ProductCard> = ({ data }) => {
    const previewModal = usePreviewModal()
    const cart = useCart()
    const router = useRouter()

    const handleClick = () => {
        router.push(`/product/${data?.id}`)
    }

    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation()

        previewModal.onOpen(data)
    }

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation()

        cart.addItem(data)
    }

    return (
        <div
            onClick={handleClick}
            className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
        >
            {/* Image & actions */}
            <div className="aspect-square rounded-xl bg-gray-100 relative">
                <Image
                    src={data.images?.[0]?.url}
                    alt=""
                    fill
                    className="aspect-square object-cover rounded-md"
                />
                <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
                    <div className="flex gap-x-6 justify-center">
                        <IconButton
                            onClick={onPreview}
                            icon={
                                <Expand size={20} className="text-gray-600" />
                            }
                        />
                        <IconButton
                            onClick={onAddToCart}
                            icon={
                                <ShoppingCart
                                    size={20}
                                    className="text-gray-600"
                                />
                            }
                        />
                    </div>
                </div>
            </div>
            {/* Description */}
            <div>
                <div className="flex gap-x-4 items-baseline">
                    <p className="font-semibold text-lg">{data.name}</p>
                </div>
                <div className="flex gap-x-4">
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
            {/* Price & Review */}
            <div className="flex items-center justify-between">
                <Currency value={data?.price} />
            </div>
        </div>
    )
}

export default ProductCard
