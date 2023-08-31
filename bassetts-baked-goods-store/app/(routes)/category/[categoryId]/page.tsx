import Container from "@/components/ui/container"
import Billboard from "@/components/ui/billboard"
import ProductCard from "@/components/ui/product-card"
import NoResults from "@/components/ui/no-results"

import getProducts from "@/actions/get-products"
import getCategory from "@/actions/get-category"
import getSizes from "@/actions/get-sizes"

import Filter from "./components/filter"
import MobileFilters from "./components/mobile-filters"

export const revalidate = 0

interface CategoryPageProps {
    params: {
        categoryId: string
    }
    searchParams: {
        sizeId: string
    }
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
    params,
    searchParams,
}) => {
    const products = await getProducts({
        categoryId: params.categoryId,
        sizeId: searchParams.sizeId,
    })

    const vegan = await getProducts({ canBeVegan: true })
    //for building a filter
    const sizes = await getSizes()
    const category = await getCategory(params.categoryId)

    return (
        <>
            <section className="grid grid-cols-2 mb-24 bg-blue-50">
                <Billboard data={category.billboard} />
                <div className="grid content-center p-8">
                    <p className="text-3xl font-semibold pb-4">
                        {category.name}
                    </p>
                    <p className="text-lg max-w-md">{category.description}</p>
                </div>
            </section>
            <Container>
                <div className="px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                        <MobileFilters sizes={sizes} />
                        <div className="hidden lg:block">
                            <Filter
                                valueKey="sizeId"
                                name="Sizes"
                                data={sizes}
                            />
                        </div>
                        <div className="mt-6 lg:col-span-4 lg:mt-0">
                            {products.length === 0 && <NoResults />}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {products.map((item) => (
                                    <ProductCard key={item.id} data={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default CategoryPage
