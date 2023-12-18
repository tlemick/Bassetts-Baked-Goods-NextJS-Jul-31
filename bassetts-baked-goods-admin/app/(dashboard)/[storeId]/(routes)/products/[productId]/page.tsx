import prismadb from '@/lib/prismadb';

import { ProductForm } from './components/product-form';

// THIS PAGE PULLS PRODUCTS / CATEGORIES / SIZES
// AND MAKES THEM AVAILABLE TO THE PRODUCT FORM
// FOR CREATING / UPDATING / DELETING


const ProductPage = async ({
	params,
}: {
	params: { productId: string; storeId: string };
}) => {
	const product = await prismadb.product.findUnique({
		where: {
			id: params.productId,
		},
		include: {
			images: true,
			sizes: true
		},
	});

	// console.log(product)
	// e.g. 
	// {
	// 	id: '9e4b1a51-255d-4b12-b651-65caef3ddd4a',
	// 	storeId: '4fca1f64-e6e9-4de4-90d6-d205b476ccb3',
	// 	categoryId: '3edf8943-6b62-4b68-bac8-55513cfa54b6',
	// 	name: 'test5',
	// 	description: 'test5',
	// 	isFeatured: true,
	// 	isArchived: false,
	// 	canBeVegan: false,
	// 	canBeGF: false,
	// 	createdAt: 2023-12-17T19:54:23.805Z,
	// 	updatedAt: 2023-12-17T20:06:57.658Z,
	// 	images: [
	// 	  {
	// 		id: '331d2212-75fc-4150-9ee4-9bb0b63bb286',
	// 		productId: '9e4b1a51-255d-4b12-b651-65caef3ddd4a',
	// 		url: 'https://res.cloudinary.com/dw8uw8r90/image/upload/v1702842852/xmxutnxwai0eccwq8c5r.png',
	// 		createdAt: 2023-12-17T20:06:58.648Z,
	// 		updatedAt: 2023-12-17T20:06:58.648Z
	// 	  }
	// 	],
	// 	sizes: [
	// 	  {
	// 		id: '316ddb6b-3b4c-41b7-ab95-91e9afdb6b05',
	// 		storeId: '4fca1f64-e6e9-4de4-90d6-d205b476ccb3',
	// 		name: '1 Loaf',
	// 		dimensions: '1 Loaf',
	// 		price: 12,
	// 		createdAt: 2023-09-06T17:27:28.638Z,
	// 		updatedat: 2023-09-06T17:27:28.638Z
	// 	  },
	// 	  {
	// 		id: '60aad9cd-852c-42ab-9da2-3d765a1566cf',
	// 		storeId: '4fca1f64-e6e9-4de4-90d6-d205b476ccb3',
	// 		name: '12 Count',
	// 		dimensions: '12 Count',
	// 		price: 20,
	// 		createdAt: 2023-12-11T21:51:43.305Z,
	// 		updatedat: 2023-12-11T21:51:43.305Z
	// 	  }
	// 	]}

	const categories = await prismadb.category.findMany({
		where: {
			storeId: params.storeId,
		},
	});
	const sizes = await prismadb.size.findMany({
		where: {
			storeId: params.storeId,
		},
	});

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6 ">
				<ProductForm
					categories={categories}
					sizes={sizes}
					initialData={product}
				/>
			</div>
		</div>
	);
};

export default ProductPage;
