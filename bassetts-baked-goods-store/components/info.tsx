"use client"

import { ShoppingCart, Vegan, WheatOff } from "lucide-react"

import Currency from "@/components/ui/currency"
import Button from "@/components/ui/button"
import { Product } from "@/types"
import useCart from "@/hooks/use-cart"

interface InfoProps {
    data: Product
}

const Info: React.FC<InfoProps> = ({ data }) => {
    const cart = useCart()

    const onAddToCart = () => {
        cart.addItem(data)
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
            <div className="mt-3 flex items-end justify-between">
                <p className="text-2xl text-gray-900">
                    <Currency value={data?.price} />
                </p>
            </div>
            <hr className="my-4" />

            <div className="flex flex-col gap-y-6">
                <div>
                    <p className="text-black">{data?.description}</p>
                </div>
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Size:</h3>
                    <div>{data?.size?.value}</div>
                </div>
                <div>
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
                                <p className="text-sm text-gray-500">
                                    Gluten free
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-10 flex items-center gap-x-3">
                <Button
                    onClick={onAddToCart}
                    className="flex items-center gap-x-2"
                >
                    Add To Cart
                    <ShoppingCart size={20} />
                </Button>
            </div>
        </div>
    )
}

export default Info
