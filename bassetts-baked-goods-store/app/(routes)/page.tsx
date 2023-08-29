import getBillboard from "@/actions/get-billboard"
import Container from "@/components/ui/container"
import Billboard from "@/components/ui/billboard"
import getProducts from "@/actions/get-products"
import ProductList from "@/components/product-list"

export const revalidate = 0

const HomePage = async () => {
    const products = await getProducts({ isFeatured: true })
    const billboard = await getBillboard("85ce0ad5-a7fb-45a4-9cf3-08ccae167253")
    return (
        <Container>
            <div className="space-y-10 pb-10">
                <Billboard data={billboard} />
            </div>
            <div className="flex flex-col gap-y-8 sm:px-6 lg:px-8">
                <ProductList title="Featured Products" items={products} />
            </div>
        </Container>
    )
}

export default HomePage
