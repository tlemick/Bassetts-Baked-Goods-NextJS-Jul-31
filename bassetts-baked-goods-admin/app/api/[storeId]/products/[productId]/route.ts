import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function GET(
	_req: Request,
	{ params }: { params: { productId: string } },
) {
	try {
		if (!params.productId) {
			return new NextResponse('Product id is required', { status: 400 });
		}

		const product = await prismadb.product.findUnique({
			where: {
				id: params.productId,
			},
			include: {
				images: true,
				category: true,
				sizes: true,
			},
		});

		return NextResponse.json(product);
	} catch (error) {
		console.log('[PRODUCT_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string; productId: string } },
) {
	try {
		const { userId } = auth();

		const body = await req.json();

		const {
			name,
			description,
			categoryId,
			productSizes,
			images,
			isFeatured,
			isArchived,
			canBeGF,
			canBeVegan,
		} = body;

		if (!userId) {
			return new NextResponse('Unathenticated', { status: 401 });
		}

		if (!name) {
			return new NextResponse('Name is required', { status: 400 });
		}

		if (!description) {
			return new NextResponse('Description is required', { status: 400 });
		}

		if (!images || !images.length) {
			return new NextResponse('Images are required', { status: 400 });
		}

		if (!categoryId) {
			return new NextResponse('Category Id is required', { status: 400 });
		}

		if (!productSizes || !productSizes.length) {
			return new NextResponse('Size(s) required', { status: 400 });
		}

		if (!params.productId) {
			return new NextResponse('Product id is required', { status: 400 });
		}


		const storeByUserId = await prismadb.store.findFirst({
			where: {
				id: params.storeId,
				userId,
			},
		});

		if (!storeByUserId) {
			return new NextResponse('Unauthorized', { status: 403 });
		}

		//this section of code takes the data for the product and deletes any existing images. ((and should also remove any Size IDS))
		await prismadb.product.update({
			where: {
				id: params.productId,
			},
			data: {
				name,
				description,
				categoryId,
				//We need to remove all sizes that might be present in the product
				images: {
					deleteMany: {},
				},
				sizes: {
					set: [],
				},
				isArchived,
				isFeatured,
				canBeGF,
				canBeVegan,
			},
		});

		//and we add the images AND SIZES here
		const product = await prismadb.product.update({
			where: {
				id: params.productId
			},
			data: {
				images: {
					createMany: {
						data: [
							...images.map((image: {url: string}) => image),
						]
					}
				},
				sizes: {
					connect: productSizes,
				},
			}
		})

		return NextResponse.json(product);

	} catch (error) {
		console.log('[PRODUCT_PATCH]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function DELETE(
	_req: Request,
	{ params }: { params: { storeId: string; productId: string } },
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse('Unathenticated', { status: 401 });
		}

		if (!params.productId) {
			return new NextResponse('Product id is required', { status: 400 });
		}

		const storeByUserId = await prismadb.store.findFirst({
			where: {
				id: params.storeId,
				userId,
			},
		});

		if (!storeByUserId) {
			return new NextResponse('Unauthorized', { status: 403 });
		}

		const product = await prismadb.product.deleteMany({
			where: {
				id: params.productId,
			},
		});

		return NextResponse.json(product);
	} catch (error) {
		console.log('[PRODUCT_DELETE]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
