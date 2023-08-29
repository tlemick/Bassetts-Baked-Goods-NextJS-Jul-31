import qs from "query-string"

import { Product } from "@/types"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`

interface Query {
    categoryId?: string
    sizeId?: string
    isFeatured?: boolean
    canBeVegan?: boolean
    canBeGF?: boolean
}

const getProducts = async (query: Query): Promise<Product[]> => {
    const url = qs.stringifyUrl({
        url: URL,
        query: {
            sizeId: query.sizeId,
            categoryId: query.categoryId,
            isFeatured: query.isFeatured,
            canBeVegan: query.canBeVegan,
            canBeGF: query.canBeGF,
        },
    })

    const res = await fetch(url)

    return res.json()
}

export default getProducts
