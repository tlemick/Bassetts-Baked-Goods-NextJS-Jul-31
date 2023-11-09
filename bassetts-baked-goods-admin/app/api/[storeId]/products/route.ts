import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
import { ProductColumn } from '@/app/(dashboard)/[storeId]/(routes)/products/components/columns';
import { ProductFormValues } from '@/app/(dashboard)/[storeId]/(routes)/products/[productId]/components/product-form';

export async function POST(
	req: Request,
	{ params }: { params: { storeId: string } },
) {
	try {
		const { userId } = auth();

		const body: ProductFormValues = await req.json();

		const {
			name,
			description,
			categoryId,
			sizes,
			images,
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

		if (!images?.length) {
			return new NextResponse('Images are required', { status: 400 });
		}

		if (!description) {
			return new NextResponse('Description is required', { status: 400 });
		}

		if (!categoryId) {
			return new NextResponse('Category id is required', { status: 400 });
		}

		if (!sizes?.length) {
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
				sizes: {
					connect: sizes.map((size) => ({ id: size })),
				},
				images: {
					createMany: {
						data: [...images.map((image: { url: string }) => image)],
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
		//const sizes = searchParams.get('sizeId') || undefined;
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
