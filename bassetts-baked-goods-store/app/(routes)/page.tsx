import getBillboard from '@/actions/get-billboard';
import Container from '@/components/ui/container';
import Billboard from '@/components/ui/billboard';
import getProducts from '@/actions/get-products';
import ProductList from '@/components/product-list';

export const revalidate = 0;

const HomePage = async () => {
	const products = await getProducts({ isFeatured: true });
	const veganProducts = await getProducts({ canBeVegan: true });

	const billboard = await getBillboard('d0a46c49-7335-4efd-9b43-93c86353e562');

	return (
		<Container>
			<div className="space-y-10 rounded-full pb-10">
				<Billboard data={billboard} />
			</div>
			<div className="flex flex-col gap-y-8 sm:px-6 lg:px-8">
				<ProductList title="Featured Products" items={products} />
			</div>
			<div className="flex flex-col gap-y-8 sm:px-6 lg:px-8">
				<ProductList title="Explore our vegan options!" items={veganProducts} />
			</div>
		</Container>
	);
};

export default HomePage;
