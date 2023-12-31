import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function POST(
	req: Request,
	{ params }: { params: { storeId: string } },
) {
	try {
		const { userId } = auth();

		const body = await req.json();

		const {
			name,
			description,
			categoryId,
			images,
			productSizes,
			isFeatured,
			isArchived,
			canBeVegan,
			canBeGF,
		} = body;

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		if (!name) {
			return new NextResponse('Name is required', { status: 400 });
		}

		if (!images || !images.length) {
			return new NextResponse('Images are required', { status: 400 });
		}

		if (!description) {
			return new NextResponse('Description is required', { status: 400 });
		}

		if (!categoryId) {
			return new NextResponse('Category id is required', { status: 400 });
		}

		if (!productSizes || !productSizes) {
			return new NextResponse('Size(s) required', { status: 400 });
		}

		if (!params.storeId) {
			return new NextResponse('Store id is required', { status: 400 });
		}

		const storeByUserId = await prismadb.store.findFirst({
			where: {
				id: params.storeId,
				userId,
			},
		});

		if (!storeByUserId) {
			return new NextResponse('Unauthorized', { status: 405 });
		}

		//console.log(productSizes);
		//console.log(productSizes.map(f => {id: f.id}));

		const product = await prismadb.product.create({
			data: {
				name,
				description,
				isFeatured,
				isArchived,
				canBeGF,
				canBeVegan,
				categoryId,
				storeId: params.storeId,
				//figure out how to send the selected sizes from product form to be created
				//sizes: productSizes.map((p: { id: string }) => {id: p.id}),
				sizes: {
					connect: productSizes,
				},
				images: {
					createMany: {
						data: [
							...images.map((image: { url: string }) => image),
						],
					},
				},
			},
		});

		return NextResponse.json(product);
	} catch (error) {
		console.log('[PRODUCTS_POST]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function GET(
	req: Request,
	{ params }: { params: { storeId: string } },
) {
	try {
		const { searchParams } = new URL(req.url);
		const categoryId = searchParams.get('categoryId') || undefined;
		//I think that I need to get an array of size IDs here || is it necessary at all?
		const sizes = searchParams.get('size.id') || undefined;
		const isFeatured = searchParams.get('isFeatured');
		const canBeGF = searchParams.get('canBeGF');
		const canBeVegan = searchParams.get('canBeVegan');

		if (!params.storeId) {
			return new NextResponse('Store id is required', { status: 400 });
		}

		const products = await prismadb.product.findMany({
			where: {
				storeId: params.storeId,
				categoryId,
				isFeatured: isFeatured ? true : undefined,
				canBeGF: canBeGF ? true : undefined,
				canBeVegan: canBeVegan ? true : undefined,
				isArchived: false,
			},
			include: {
				images: true,
				category: true,
				sizes: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		return NextResponse.json(products);
	} catch (error) {
		console.log('[PRODUCTS_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
